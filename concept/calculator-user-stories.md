# FBS Calculator — 42 User Stories (Dasbanq & NexxdiPay Engine)

**Goal:** Create a "seamless, magical" experience for the user. They select "Send USD/EUR" via specific rails (SEPA, Wire, ACH) and immediately see exactly how much COP or USDT their recipient gets, with all complex fee logic (Dasbanq rates, NexxdiPay MAX spreads, fixed + % fees) abstracted away behind a beautiful UI.

## Theme 1: Core UX & "The Magic Feel" (US01-US07)
1. **US01:** As a user, I want to see a clean, minimalist calculator on the hero section without overwhelming tables or rate comparisons.
2. **US02:** As a user, when I enter "1000" in the "Send" field, the "Receive" field updates instantly with a smooth number-rolling animation.
3. **US03:** As a user, I want the system to automatically deduct all rail fees and commissions so the "Receive" amount is the absolute net value my family/provider will get.
4. **US04:** As a user, I want to swap between "Send" and "Receive" modes just by clicking a center gold arrow icon.
5. **US05:** As a user, I want to see a subtle "Live Data" indicator (pinging green dot) so I know the rates are real-time.
6. **US06:** As a user, I don't want to see "Dasbanq" or "NexxdiPay" logos in the calculator; the data should feel like native FBS institutional intelligence.
7. **US07:** As a user, if I enter an amount below the $500 minimum, the UI should gracefully auto-correct to $500 and show a gentle tooltip.

## Theme 2: Fiat Input & Output Selection (US08-US14)
8. **US08:** As a sender from Europe, I want to select "Send EUR (SEPA)" from a beautiful dropdown with an EU flag.
9. **US09:** As a sender from the US, I want to select "Send USD (Wire)" or "Send USD (ACH)" from the dropdown and clearly distinguish them by label.
10. **US10:** As a receiver in Colombia, I want to select "Receive COP (Bancolombia/Nequi)" with a Colombian flag.
11. **US11:** As a crypto user, I want to select "Receive USDT (TRC20/ERC20)" with a Tether logo.
12. **US12:** As a user, if I select EUR as input, the calculator uses Dasbanq EUR/USD rates behind the scenes to find the USD base.
13. **US13:** As a user, the currency selector should feel like a premium mobile iOS picker, smooth and tactile.
14. **US14:** As a user, switching the input currency from USD to EUR should instantly recalculate the output without page reloads.

## Theme 3: The COP Engine (NexxdiPay / LoopayX) (US15-US21)
15. **US15:** As the system, I must fetch rates from NexxdiPay and LoopayX every 5 seconds.
16. **US16:** As the system, I must select the `MAX` rate between NexxdiPay and LoopayX as the base COP rate.
17. **US17:** As the system, I must subtract the configured spread (e.g., $12 COP) from the `MAX` rate before presenting it to the math engine.
18. **US18:** As the system, if LoopayX goes offline ($0), I must seamlessly fallback to using only NexxdiPay, and vice versa.
19. **US19:** As a user sending $1K-$5K USD to COP, the system should automatically deduct the 0.2% + $2,000 COP fee from the final COP amount.
20. **US20:** As a user sending >$5K USD to COP, the system should automatically deduct the fixed $2,400 COP fee (ignoring the %).
21. **US21:** As a user, I just see the final COP amount. If I hover over an "Info" icon, a sleek tooltip says "Todas las comisiones incluidas — Lo que ves es lo que llega."

## Theme 4: The USD/EUR & International Engine (Dasbanq) (US22-US28)
22. **US22:** As the system, I must fetch live EUR/USD buy/sell spreads from Dasbanq.
23. **US23:** As a user sending EUR, the system uses the Dasbanq "Venta" rate to convert my EUR to the USD base internal value.
24. **US24:** As a user sending $<1,000 USD internationally, the system deducts a 2% volume commission.
25. **US25:** As a user sending $1,000-$3,000 USD internationally, the system deducts a 1.5% volume commission.
26. **US26:** As a user entering >$3,000 USD for international routes, the output should say "Tasa Preferencial" and prompt me to click WhatsApp for a custom VIP quote.
27. **US27:** As the system, if I select "Send USD (Wire)", a fixed $25 fee is deducted from the base before conversion.
28. **US28:** As the system, if I select "Send EUR (SEPA)", a fixed $2 fee is deducted from the base before conversion.

## Theme 5: Crypto Output (USDT) (US29-US32)
29. **US29:** As a user selecting "Receive USDT", the system calculates my payout in USDT at a 1:1 ratio with the USD base.
30. **US30:** As the system, I must deduct a strict 0.5% crypto processing fee from the total USDT payout.
31. **US31:** As a user, if I send 1000 EUR via SEPA to receive USDT, the system calculates: (1000 EUR * Dasbanq EUR/USD) - $2 SEPA fee - 0.5% Crypto fee = Net USDT.
32. **US32:** As a user, the transition to USDT output should feel native and trustworthy, with no mention of volatile crypto exchanges.

## Theme 6: CTWA Handoff (WhatsApp) (US33-US37)
33. **US33:** As a user, when I click "Iniciar Transferencia en WhatsApp", it captures my exact inputs.
34. **US34:** As the system, the generated WhatsApp message must read: "Hola, quiero cotizar un envío de [1000] [EUR - SEPA] para recibir [COP]. Mi cotización en web fue [4,200,500 COP]."
35. **US35:** As a tracking system, clicking the CTWA button fires a Meta Pixel `Contact` event with the `value` parameter set to the USD equivalent.
36. **US36:** As a tracking system, clicking the CTWA button fires a GA4 `whatsapp_click` event.
37. **US37:** As an ad-driven user, my UTM tags from the URL are appended to the WhatsApp message invisibly or stored so the broker sees my origin.

## Theme 7: Edge Cases & Resilience (US38-US42)
38. **US38:** As the system, if Dasbanq API times out, I use an intelligent 5-minute cached fallback rate so the user never sees an error.
39. **US39:** As a user, if I type letters into the calculator amount field, it only accepts numeric inputs with formatting.
40. **US40:** As the system, API caching ensures the `QuoteCalculator` never slows down the initial LCP page load.
41. **US41:** As a mobile user, tapping the input field brings up the numeric keypad, not the standard keyboard.
42. **US42:** As the system, the data polling happens exclusively Server-Side using Next.js route handlers (`/api/rates`), protecting our Dasbanq and NexxdiPay API footprints from client-side scraping.
