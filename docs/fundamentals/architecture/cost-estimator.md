---
title: Cost estimator
description: Understand cost approximations for table creates and writes based on statement size.
keywords:
  - query costs
  - cost
---

import { TokenCost, QueryCosts } from '@site/src/components/CostEstimator'

Every byte [contributes to the cost](/fundamentals/architecture/query-optimization) associated with database mutating queries, and we're always working to reduce costs with the goal of being cost competitive with web2 databases. The tables highlighted below provide _estimates_ for creating and writing data where each shows the following:

- Size of the statement in bytes (B).
- Cost in the chain's native crypto token or USD.
- These costs mapped per megabyte (MB).

Please be sure to perform your own tests to understand price implications since the live market impacts the price of any onchain transaction. For these estimates, the following market prices (USD) are hardcoded in the calculation:

- **ETH price**: <TokenCost token={'ETH'} />
- **MATIC price**: <TokenCost token={'MATIC'} />
- **FIL price**: <TokenCost token={'FIL'} />

Note that all chains' native token is ETH, except for Polygon (uses MATIC) and Filecoin (uses FIL).

## Create costs

<QueryCosts type={'create'} />

## Write costs

<QueryCosts type={'write'} />
