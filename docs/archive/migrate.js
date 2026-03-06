const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const PROJECT_REF = "eohzuleozwvmiupylixf";
const PASSWORD = "Siempre.fullbrokersservices26";
const SQL_PATH = path.join(__dirname, 'migrations', '20260305_init_harvester.sql');

async function run() {
    if (!fs.existsSync(SQL_PATH)) {
        console.error("❌ SQL File not found");
        return;
    }
    const sql = fs.readFileSync(SQL_PATH, 'utf8');

    // Regions for AWS, GCP, and Azure
    const regions = [
        "aws-0-us-east-1", "aws-0-us-east-2", "aws-0-us-west-1", "aws-0-us-west-2",
        "aws-0-sa-east-1", "aws-0-ca-central-1", "aws-0-eu-central-1", "aws-0-eu-west-1",
        "aws-0-ap-southeast-1", "gcp-0-us-east1", "gcp-0-us-west1", "az-0-eastus2"
    ];

    for (const reg of regions) {
        const host = `${reg}.pooler.supabase.com`;

        // Two common user formats for Supavisor
        const userFormats = [
            `postgres.${PROJECT_REF}`,
            `postgres`
        ];

        for (const user of userFormats) {
            let connStr;
            if (user === `postgres.${PROJECT_REF}`) {
                connStr = `postgresql://postgres.${PROJECT_REF}:${PASSWORD}@${host}:6543/postgres`;
            } else {
                connStr = `postgresql://postgres:${PASSWORD};project=${PROJECT_REF}@${host}:6543/postgres`;
            }

            console.log(`🔍 Testing ${host} (${user === `postgres.${PROJECT_REF}` ? 'prefix' : 'password-suffix'})...`);
            const client = new Client({
                connectionString: connStr,
                connectionTimeoutMillis: 5000,
                ssl: { rejectUnauthorized: false }
            });

            try {
                await client.connect();
                console.log(`✅ SUCCESS! Connected to ${host} as ${user}`);
                await client.query(sql);
                console.log("🎉 MIGRATION APPLIED SUCCESSFULLY.");
                await client.end();
                process.exit(0);
            } catch (err) {
                const msg = err.message.split('\n')[0];
                if (msg.includes("Tenant or user not found")) {
                    // Skip other user formats for this region if it says tenant not found
                    console.log(`⏭️ ${host}: Tenant not found.`);
                    break;
                } else if (msg.includes("timeout")) {
                    console.log(`⏳ ${host}: Timeout.`);
                    break;
                } else {
                    console.log(`❌ ${host} (${user}): ${msg}`);
                }
            } finally {
                try { await client.end(); } catch (e) { }
            }
        }
    }
    console.log("⚠️ All combinations failed locally.");
}

run();
