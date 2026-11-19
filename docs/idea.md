This is a conversation between me and a large language model where we're planning how we should execute this. From this you can get the idea of what should be done. What my ideas are and what I want

So here is my reasoning. Let's say that agents are going to be the big next thing that is going to make purchases on our behalfs, and all of that. And one big thing that these people who are using agents have in common is that they are men, and they might be spending too much time on their phones, computers, neglecting their girlfriends, and would delegate to their agents to make their girlfriend happy. Let's say. I know this is a stupid formalization or definition, but you get the idea. And so I think one big thing would be getting flowers for a girl, and that the agent is going to order that, and I would like to create a marketplace where agents can easily order a flower, pay, order a flower, and the girlfriend would get it in the mail. It would be delivered. So it's kind of a delivery service, kind of. We could connect maybe like Uber Eats, through which you can order different kind of stuff, and the Uber Eats guy is going to go ahead and take and deliver the flower. Now one thing that needs to be done is definitely get on board a bunch of women, I guess, or not women, but flower shops. And so I would be the gateway between the flower shops and the agent. It would be a marketplace, and maybe we could start with New York City. So could you please think about how to go about this? What are the main challenges and the main things that have to be done? How will the agents communicate with my marketplace? How will I connect Uber Eats, or one of these delivery services that is very big in New York and deliver everything, and the flower shops?


I actually think there's a potentially interesting business here. And I would approach it slightly differently from how you've initially described it.

**I wouldn't build another flower-delivery marketplace. I'd build the commerce infrastructure that allows AI agents to purchase gifts from local businesses.**

Flowers would be your first product category, New York your first market, and local florists your initial supply network.

This distinction is important because the long-term opportunity could be much bigger than flowers.

Let me break it down as a business and a technical product.

# **1. The business concept**

Imagine this scenario:

A guy tells his AI assistant:

> "My girlfriend has had a difficult week. I'd like to send her something nice tomorrow. She likes tulips, and I have a budget of $80. She lives in Brooklyn."

The agent needs to:

1. Find suitable flower shops near the recipient.
2. Browse their available arrangements.
3. Compare prices and delivery times.
4. Select an arrangement.
5. Confirm the purchase with the user.
6. Pay.
7. Arrange delivery.
8. Notify the user when it's delivered.

Your platform sits between the AI agent and the florists.

## **The proposed ecosystem**

**AI agents**

ChatGPT, Claude, personal agents, etc.

Your platform

Discovery · Ordering · Payments · Coordination

**Florist network**

Independent flower shops across NYC

**Delivery infrastructure**

Uber Direct · DoorDash Drive · Other couriers

**The recipient**

Receives the flowers

Your platform would ideally own the customer-facing transaction, while outsourcing the physical delivery.

There are four stakeholders:

- The AI agent: discovers and purchases.
- The customer: authorizes and pays.
- The florist: prepares the flowers.
- The delivery company: transports them.

Your company coordinates the entire transaction.

# **2. How would AI agents communicate with your marketplace?**

This is probably the most interesting technical question.

You shouldn't expect agents to interact with your marketplace like ordinary human users. You should make your marketplace programmatically accessible.

There are already emerging standards for this.

I would investigate two technologies:

### **A. MCP (Model Context Protocol)**

MCP allows AI agents to discover and use tools exposed by external services.

You could expose a florist marketplace as an MCP server.

For example, an agent could call:

| Tool                 | Purpose                      |
| -------------------- | ---------------------------- |
| `search_flowers`     | Find available arrangements  |
| `get_flower_details` | Retrieve product information |
| `check_delivery`     | Check delivery availability  |
| `get_delivery_quote` | Calculate delivery cost      |
| `create_order`       | Create an order              |
| `get_order_status`   | Track an order               |

An agent could discover these tools and use them without needing to understand your internal software.

For example, your marketplace might return:

```
{
  "products": [
    {
      "id": "NYC-104",
      "name": "Pink Tulip Bouquet",
      "price": 65,
      "currency": "USD",
      "florist": "Brooklyn Flowers",
      "delivery_available": true
    }
  ]
}
```

The agent can then make a selection and proceed to checkout.

### **B. Agentic Commerce Protocol (ACP)**

This is particularly interesting.

ACP is an emerging open protocol designed specifically to allow AI agents to purchase products from businesses.

It standardizes the interaction between:

- The buyer's agent.
- The merchant.
- The payment infrastructure.

It includes checkout operations and secure payment credential handling.

You should investigate it seriously rather than inventing your own checkout protocol.

Sources:

- [Agentic Commerce Protocol documentation](https://www.agenticcommerce.dev/docs?utm_source=chatgpt.com)
- [ACP's MCP integration](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/docs/mcp-binding.md?utm_source=chatgpt.com)

**My recommendation:** Build an ordinary REST API as your foundation, and expose its functionality through MCP. Investigate ACP for standardized checkout and payments.

That gives you compatibility with both traditional integrations and emerging agent-commerce ecosystems.

# **3. How would you connect the delivery companies?**

This is where I think you should be careful about choosing the right Uber product.

Uber has two products that sound similar but serve different purposes.

## **Option A: Uber Direct — my preferred choice**

[Uber Direct: Boost Sales with Same-Day Delivery  – RNR Media Grp](https://images.openai.com/static-rsc-4/xeOE5QDTNdmYFFIIH-GcH-FB4NSjE_RMNYRuRD3tMh91Q7tDgwelUtiM18xN5p6o9TjU4ECDggO9IiaNFXgzlPm2TOxcHS-g_5cpI1Ku_D77TcZL5W8fd5OGVVr_YaOEq2HudhFDN9l5dLiKyGgg8Wy3M9dM_RCQWHTfZJKV9sM?purpose=inline)

**Uber Direct**

A white-label delivery service. Your marketplace receives the order, and Uber supplies the courier.

The customer doesn't need to order through Uber Eats.

Best fit for your model

[Uber Direct API documentation](https://developer.uber.com/docs/deliveries/overview?utm_source=chatgpt.com)

The process would look like this:

1. Florist accepts the flower order.
2. Florist prepares the bouquet.
3. Your backend requests a delivery quote from Uber.
4. Uber returns the price and estimated delivery time.
5. You confirm the delivery.
6. Uber dispatches a courier.
7. Uber sends status updates to your backend through webhooks.
8. Your marketplace informs the customer and agent.

The interesting thing is that Uber Direct already supports exactly the kind of functionality you need.

For example, its API supports:

- Delivery quotes.
- Creating deliveries.
- Scheduled deliveries.
- Delivery tracking.
- Cancellation.
- Proof of delivery.

You can even receive real-time delivery updates through webhooks.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.uber.com\&sz=32)

Uber Developers+2



You could build an abstraction layer so that you aren't dependent on Uber.

For example:

```
const delivery = await deliveryService.create({
  provider: "uber_direct",
  pickup: florist.address,
  dropoff: recipient.address,
  readyAt: "2026-11-01T14:00:00",
  orderId: "ORDER-123"
});
```

Later, you could replace Uber with DoorDash or another courier without changing how agents interact with your platform.

## **Option B: Uber Eats Marketplace**

[累計 30 回の配達で最大 7 万円の追加報酬をゲット！拡大エリアにて配達パートナー募集中](https://images.openai.com/static-rsc-4/uDlgUTcw6Sr3HBgTRmYxT3EP_AkjBxb3kAdXEdUMn87jC-N-KQkMQnk3-HuQvptvg5i7ntrUp6hJK1UwsVd_XOOXgVoR7cop4xq_A-q5KnY0F3gsFhOd_a3kQ5uxX7UMXgASrGvWbxWUaF_uqDkjb5HvEhxpUYK4oCIxVhVuuKk?purpose=inline)

**Uber Eats Marketplace**

This is the actual marketplace where customers browse restaurants and stores.

You could potentially integrate with it to manage stores, menus and orders.

[Uber Eats API documentation](https://developer.uber.com/docs/eats/introduction?utm_source=chatgpt.com)

However, I wouldn't start here.

You don't need to list your florists on Uber Eats. You need access to Uber's delivery network.

Uber Direct is designed for precisely that.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.uber.com\&sz=32)

Uber Developers+1



## **What about DoorDash?**

[Become a Dasher: Deliver with DoorDash | Dasher Central](https://images.openai.com/static-rsc-4/NTvJd6nKl-nx4XJWDv5v0vpZcBsp-ywzjXiH0t_JzsEWv6GGUw6lZl3BgeMJmpacwNqXqfTIjR6mdUgtFTRkKZNbnfAlYqnToyfF-BZJU1C5C4pNSaHH5CE8YsWuKOyboa-8iivuS0SUJTzE__Hk_KFlvmtFtrp9qyR9ksxUymQ?purpose=inline)

**DoorDash Drive**

DoorDash also offers a white-label delivery API called Drive.

[DoorDash Drive API](https://developer.doordash.com/en-US/api/drive/?utm_source=chatgpt.com)

It offers similar functionality, including creating and tracking deliveries.

However, there is an important caveat: DoorDash currently describes its new Drive API as having limited production access. Its documentation explicitly says that production approval is restricted and it cannot provide a certification timeline.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.doordash.com\&sz=32)

DoorDash Developer Services+1



I would approach both companies, but prioritize Uber Direct for the initial technical implementation.

**One important commercial consideration:** You need to establish whether Uber will onboard your company as a delivery customer/platform, or whether each florist needs its own account. This affects the entire business model. Don't assume that an API key automatically gives you permission to operate a multi-merchant delivery marketplace.

# **4. How do you connect the flower shops?**

This is probably your biggest operational challenge.

You have three possible approaches.

## **Option A: Florists use your dashboard**

You build a simple web application where each florist can:

- Register their shop.
- Upload flower arrangements.
- Set prices.
- Set opening hours.
- Set delivery availability.
- Accept or reject orders.
- Specify preparation time.
- Mark orders as ready for pickup.

[How can I select products with Floom Collection? – FloomX](https://images.openai.com/static-rsc-4/vxrD-T4AIjqnNA-J_dTzH61Dguv2pM5jya2NxVDW0BiwrYvSdvS0yxzyiENGeARLUdEx6ifm9pnOYxmMQZ5Ns0sqFybFDn3YUTsos-CKa1WV9ZBpTytuxY6IGeThgSvJV5O3P7gTeHqghwlYx_gILTWT8ZhpF1_0CgJjkhrpEX0?purpose=inline)

[help.floomx.com](https://help.floomx.com/hc/en-us/articles/360051771711-How-can-I-select-products-with-Floom-Collection?utm_source=chatgpt.com)

The agent searches your API, which retrieves the available products from your database.

When an order arrives, the florist gets a notification and accepts it.

This is probably the easiest way to start.

## **Option B: Integrate with their existing systems**

Some florists already have websites, POS systems and order management software.

You could integrate with these systems rather than forcing them to use yours.

The architecture would look like:

- Your platform receives an order.
- Your integration sends it to the florist's existing system.
- The florist confirms it.
- Your system receives the confirmation.
- Delivery is arranged.

This is more scalable but requires significantly more integration work.

## **Option C: Manual onboarding**

Honestly, I'd start here.

Contact 10–20 independent NYC florists.

Offer them:

- Additional orders.
- No need to advertise on a new consumer marketplace.
- No complicated technical integration.
- A commission only on completed orders.

You can initially accept orders through your backend and notify the florists by email, SMS or phone.

You don't need to build a sophisticated merchant dashboard before validating that people actually want to buy flowers through agents.

# **5. How do you handle payments?**

This is another important part.

Suppose:

- Customer pays $85.
- Flowers cost $65.
- Delivery costs $10.
- Your platform earns $10.

You need to collect the $85, pay the florist, pay the courier and retain your commission.

I would investigate Stripe Connect.

[docs.stripe.com](https://docs.stripe.com/connect/dashboard/review-actionable-accounts?utm_source=chatgpt.com)

Stripe Connect is specifically designed for marketplaces. It supports connected accounts, split payments, routing funds and payouts.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://stripe.com\&sz=32)

Stripe



Your payment flow could be:

| Recipient        | Amount  |
| ---------------- | ------- |
| Florist          | $65     |
| Uber Direct      | $10     |
| Your marketplace | $10     |
| **Total**        | **$85** |

These are illustrative numbers, not actual NYC delivery or payment fees.

One important detail: the exact payment architecture depends on whether you're acting as the merchant of record, a marketplace facilitating transactions, or an intermediary. You need to settle that before implementing payments, because it affects refunds, disputes, tax obligations and liability.

# **6. The competitive landscape**

You should know that this isn't an entirely new market.

There are already companies doing parts of what you're describing.

[Floom — Fresh Flowers Delivered | Choose Your Country](https://images.openai.com/static-rsc-4/KJdK1Fd0WfVc4-Dj0U7WuMQSRegmQRu9KTtUriGLmor4LHU17ax3yB2psnH_xAPmDWyteeQxndCAEp1GfbJ5b01JEk0nbUSqlil9BX2Uu-S9zvYOLbEaiBnW2bReeC2R72pXSEZ0Nww_b_fxE2amwb-1V6lssGkv9w_7CVE6JR8?purpose=inline)

**Floom**

A marketplace connecting customers with independent local florists. Probably one of the closest existing business models to your florist network concept.

[Website](https://www.floom.com/?utm_source=chatgpt.com)

[The Good Vibes (Delphinium, Lisianthus, Roses) - UrbanStems Flower Bouquet Delivery | UrbanStems Flower Delivery](https://images.openai.com/static-rsc-4/BTNAauQXH5merf19qC6x7DLgwq4uhSvPRGi9zccnaHAd0EJfLQSP3_3jF9ZTUpQhX4-j9RUUOGAHz1s9WshEaaaY9EjvbgrpT3Pq1AKYui_BahehBxY6E9vTxRT8R0-sZfQSzTpMRy3VUme-K5HFA8sOypOr6TGXQJIrPWqnhno?purpose=inline)

**UrbanStems**

Flower delivery with its own curated product offering and NYC same-day delivery.

[Website](https://urbanstems.com/?utm_source=chatgpt.com)

[There’s Just Enough Time to Get Your Mother’s Day Bouquet Delivered With 1-800-Flowers — Read Our Testing Review](https://images.openai.com/static-rsc-4/AwWonOXfH8i2y68dFfKvqWJM22vvtY-ojURmZl6hfTiSaxwFNdGlhHgN3ZDMhKR3t-CC8WdPasVQR7EwW-ERc1ZPVlIksz5IkYvyEg__MQ-1dOLXTytM3XJE_QUXmDveKKPrK2qQ8QyDWDJlVhqcaADpxH_wdRHUPkwcrcQHNCU?purpose=inline)

**1-800-Flowers**

An established flower and gift delivery business with a large network.

[Website](https://www.1800flowers.com/?utm_source=chatgpt.com)

[How Does DoorDash Work for Flower Delivery?](https://images.openai.com/static-rsc-4/ip7gZlglrntJCBhFqGEFNYIUvVn-orOCZqtOzdKBRJnLv9S2KDIuh4OeA0993UA1tL9lluy7ajt9sy8gEBlCuD5terX3xD9Wy2Bi6VHh6M0HBdM6QlF_TyDmw6GVXH0tybjbxBiDeBt9QINPEKB8dxizXK-2DG2zBQAKUoRinx8?purpose=inline)

**DoorDash**

A general-purpose delivery marketplace that also provides access to local stores and flower products.

[Website](https://www.doordash.com/?utm_source=chatgpt.com)

Sources:&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.timeout.com\&sz=32)

Time Out Worldwide+2



The interesting positioning is:

**Floom is a marketplace for people. You're trying to build a marketplace for agents.**

That is a meaningful difference in how the product is discovered, integrated and purchased.

However, don't assume that agents automatically create a new market. Your advantage needs to be more than an MCP endpoint. It should be better inventory, reliable fulfillment, excellent product data and easy purchasing.

# **7. The biggest challenges**

I would rank the challenges as follows.

## **1. Getting florists to join**

Very high priority

You need sufficient supply density.

Imagine an agent searching for flowers in Brooklyn. If you only have two florists, the marketplace isn't particularly useful.

You need:

- Enough shops in each geographical area.
- Reliable product availability.
- Consistent pricing.
- Good-quality product photographs.
- Accurate preparation times.
- Reliable order acceptance.

One particularly difficult issue is that flowers are not standardized products.

A bouquet advertised as 20 pink tulips might look different depending on the florist and what's available that day.

You need to establish rules for substitutions. For example, the agent should know whether it can authorize a florist to replace unavailable flowers with similar ones.

## **2. Delivery reliability**

Very high priority

Flowers are perishable, fragile and often time-sensitive.

Consider these situations:

- The courier arrives before the bouquet is ready.
- The florist closes before pickup.
- The courier damages the flowers.
- The recipient isn't home.
- The recipient lives in an apartment building with restricted access.
- The delivery arrives several hours late.

You need clear policies for all of these.

I would also introduce delivery quality metrics for each florist and courier provider.

## **3. Customer acquisition**

Very high priority

I actually think your initial customer hypothesis needs testing.

Your hypothesis is that people using AI agents will delegate thoughtful purchases, such as flowers, to their agents.

That's plausible, but there are several unproven assumptions:

- Do people trust agents to spend money?
- Will they delegate emotionally meaningful purchases?
- How often do they buy flowers?
- Will they pay a premium for convenience?
- Will they actually use an agent instead of ordering through an existing app?

I wouldn't make the target market "men who neglect their girlfriends."

I'd make it:

**People who want their AI assistants to take care of thoughtful, recurring purchases.**

That includes birthdays, anniversaries, apologies, congratulations, Mother's Day, Valentine's Day and spontaneous gifts.

You could eventually expand beyond romantic relationships.

## **4. Payment authorization and trust**

High priority

You need to consider that agents shouldn't have unrestricted purchasing power.

A good workflow would be:

- The user establishes a spending limit.
- The agent searches and recommends.
- The agent presents the final price.
- The user authorizes the purchase, unless they have previously granted appropriate purchasing authority.
- The payment is processed.
- The order is confirmed.

You should support explicit authorization, spending limits and idempotent order creation (so the agent doesn't accidentally order the same flowers twice).

Also, the recipient's address and phone number are sensitive personal information. You need to handle these carefully and minimize how much information is exposed to agents and florists.

## **5. Marketplace economics**

This is where I would spend quite a bit of time.

Let's make a hypothetical model.

ILLUSTRATIVE UNIT ECONOMICS — NOT VERIFIED MARKET PRICING

| Item                    | Amount  |
| ----------------------- | ------- |
| Average order value     | $85     |
| Florist payment         | -$60    |
| Delivery                | -$12    |
| Payment processing      | -$3     |
| Your gross contribution | **$10** |

Assumes a $10 marketplace commission already reflected in the split; excludes refunds, support, marketing, taxes and other overhead.

Illustrative allocation of an $85 order.

$0$20$40$60$80FloristDeliveryPaymentsPlatform

At $10 contribution per order:

| Monthly orders | Contribution |
| -------------- | ------------ |
| 100            | $1,000       |
| 1,000          | $10,000      |
| 5,000          | $50,000      |
| 10,000         | $100,000     |

This is before operating expenses.

This illustrates an important point: you need substantial transaction volume, or a higher-margin business model.

Potential revenue sources:

- Commission on each order.
- Delivery coordination margin.
- Premium florist placement (with clear disclosure).
- Subscription/API plans for agents and other platforms.
- Corporate gifting integrations.

I would initially use a transaction commission rather than charging agents for API access.

# **8. How I would actually build the MVP**

I would resist the temptation to build the entire infrastructure immediately.

You don't need 200 florists, three delivery providers and a sophisticated agent ecosystem.

You need to demonstrate that an agent can successfully purchase flowers from a local florist.

## **Suggested MVP architecture**

**1. Agent interface**

REST API + MCP

Search, compare, quote, checkout, order status.

**2. Marketplace backend**

Your core product

Node.js/TypeScript, PostgreSQL, product catalogue, florist management, order state machine.

**3. Payments**

Stripe Connect

Customer payments, florist payouts, commissions, refunds.

**4. Merchant interface**

Web dashboard

Florist onboarding, products, inventory, accepting orders, preparation status.

**5. Delivery integration**

Uber Direct

Quotes, dispatch, tracking and delivery confirmation.

### **The API I'd build**

I would start with these endpoints:

| Endpoint                  | Function                    |
| ------------------------- | --------------------------- |
| `GET /flowers`            | Search arrangements         |
| `GET /flowers/:id`        | Get product details         |
| `GET /florists`           | Search florists by location |
| `POST /delivery/quote`    | Calculate delivery          |
| `POST /checkout`          | Initiate checkout           |
| `POST /orders`            | Place confirmed order       |
| `GET /orders/:id`         | Retrieve order status       |
| `POST /orders/:id/cancel` | Cancel order                |

Internally, you would have separate integrations for each delivery provider and florist.

The agents should never need to know whether an order is being delivered by Uber or DoorDash.

### **A very important design decision**

Separate the *product catalogue* from the *delivery system*.

A florist sells a product. Your delivery integration transports it.

This sounds obvious, but it makes your infrastructure much easier to extend to other categories later.

# **9. Starting in New York City**

I like NYC as a potential starting market.

It's dense, has many independent florists, and has established last-mile delivery infrastructure.

However, I would start with a smaller geographical area.

[What Is The Flower District Nyc at Glen Chambers blog](https://images.openai.com/static-rsc-4/g-PhbUpZXJhPy7FDggUWrShs4heMXtcGsOW6bbOecKVb7Ka6IWW4eK78XO6PbWNFIBggWooBGi-s2r3rWdBUa_vNDKHUmnQTJiIhUz2MxtIVIbH9AgFzEpThgFoQ3m8c9pYncO3HsesiLUJxeiaoQ41qLWre8q0fzQ2UBOqOsQE?purpose=inline)

[Geometry Gardens  – inStorify](https://images.openai.com/static-rsc-4/Eae2QCGGN3Xt38fG_QmwTlgVpzRALOPKgcl0b21Fvpe35kwCv7mTKrUKe9rNwNiwuHbygMpslPyi8uJo2UtzKR0LogMVnMe_Y7aOfEhS6LIn9K7iKhXK3iFRzW1qHg9aDfTcfmZcwoKNN_8u2QTaszF9AWIwcpZ6kz002ZUnCzE?purpose=inline)

[Wholesale Flowers — New York's Historic Floral District](https://images.openai.com/static-rsc-4/AtxZQBAvNiBWkXzdDFCDkV9VssQZ6LJM850S3n9-lQVrZBtvzQYg5vaTvwaFcd-bMG85WRN_5ZlRaCSVqHwySuOWFS78VTC9MaUPAc4lkl15z3VIvvDCI-wr12jp1yAiwEDPAXU1sIhVC2vqERRp3YUwvX43gPsajjjX2Fgz4xI?purpose=inline)

8

My initial recommendation would be:

- Manhattan.
- Williamsburg.
- Brooklyn Heights.
- Park Slope.

I wouldn't launch across all five boroughs immediately.

I'd aim for approximately 10–20 florists, with a manageable delivery radius.

Potential florist acquisition targets include:

- Plantshed.
- Ode à la Rose.
- Scotts Flowers.
- Flowers by Richard.

These are research leads, not confirmed partnership prospects.

# **10. A practical 90-day plan**

This is how I'd approach it.

1. **Weeks 1–2: Validate demand**
   - Interview 20–30 potential customers.
   - Interview 10 florists.
   - Investigate agent-based purchasing behaviour.
   - Contact Uber Direct about commercial access.
   - Establish a preliminary commission model.
2. **Weeks 3–4: Secure supply**
   - Onboard 5–10 florists.
   - Obtain their product catalogues.
   - Establish pricing and availability procedures.
   - Agree on preparation and substitution policies.
   - Test manual delivery arrangements.
3. **Weeks 5–8: Build the technical MVP**
   - Develop the marketplace API.
   - Build the florist dashboard.
   - Integrate Stripe Connect.
   - Integrate Uber Direct if approved.
   - Expose the API through MCP.
   - Implement order tracking and failure handling.
4. **Weeks 9–12: Pilot**
   - Connect a few AI agents.
   - Process real orders.
   - Test payment authorization.
   - Measure delivery reliability.
   - Interview customers and florists.
   - Calculate actual contribution per order.

The initial success metric shouldn't be the number of registered florists.

It should be something like:

**Can an AI agent independently complete a flower purchase, with appropriate customer authorization, and have the flowers successfully delivered?**

If you can demonstrate that reliably, you have something worth building on.

# **11. Where I think the real opportunity is**

I want to highlight one strategic possibility.

Imagine you successfully build this for flowers.

Then you have three valuable assets:

1. **A network of local merchants** willing to accept agent-generated orders.
2. **A commerce API** that AI agents can use to discover, purchase and track products.
3. **A fulfillment network** that connects orders to physical delivery infrastructure.

You could subsequently expand into:

| Category           | Examples                          |
| ------------------ | --------------------------------- |
| Flowers            | Bouquets, plants                  |
| Gifts              | Chocolates, gift boxes, jewellery |
| Food               | Cakes, pastries, special meals    |
| Experiences        | Restaurant bookings, tickets      |
| Personal care      | Skincare, beauty products         |
| Everyday purchases | Groceries, household products     |

Eventually, you could become a general-purpose commerce infrastructure provider for AI agents.

But there's an important distinction: your moat cannot simply be that you have an API. Other marketplaces can expose APIs too.

Your moat would need to come from merchant relationships, reliable fulfilment, product data, transaction history and integrations.

## **12. Five things I'd investigate immediately**

Before investing heavily in development, I'd answer these questions:

1. **Uber Direct:** Will Uber onboard an independent marketplace that dispatches orders on behalf of multiple independent florists?
2. **Stripe Connect:** What payment structure allows you to collect customer payments and pay independent florists while correctly handling refunds and delivery costs?
3. **Florist economics:** What commission would NYC florists actually accept?
4. **Agent distribution:** How do you get your marketplace discovered by agents? MCP is one answer, but how do you become a preferred commerce provider?
5. **Demand:** Will people actually delegate gift purchases to agents, and how frequently?

One additional competitor worth studying particularly closely is Floom. It already aggregates local florists, so you need to understand what prevents it from simply adding agent-compatible purchasing.

## **My overall assessment**

Worth validating

I like the idea, particularly because it starts with a relatively simple physical product and could evolve into infrastructure for agentic commerce.

But I would make one major adjustment to your initial strategy:

**Don't start by building a marketplace. Start by building an agent-compatible ordering and fulfilment system for a small network of florists.**

You can validate the entire transaction chain with 5 florists and one delivery provider.

If it works, expand the network and categories.

And I would personally prioritize getting a meeting with Uber Direct and speaking to 10 NYC florists before writing much code. Those two conversations could fundamentally change your architecture and business model.