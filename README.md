# How do we calculate the reduction in false alarms percentage?
Given the precision values:
- `Precision_before`: 91.3%
- `Precision_after`: 93.8%

Calculate the false positive rate (FPR) before and after the improvement:
- FPR_before = 1 - `Precision_before`
- FPR_after = 1 - `Precision_after`
- FPR_before = 1 - 0.913 = 0.087
- FPR_after = 1 - 0.938 = 0.062

Now, calculate the reduction in false alarms percentage:
- Reduction = ((`FPR_before` - `FPR_after`) / `FPR_before`) * 100
- Reduction = ((0.087 - 0.062) / 0.087) * 100
- Reduction ≈ 28.74%

So, the improvement in precision from 91.3% to 93.8% resulted in approximately a `28.74%` reduction in false alarms.


# Frontend Setup

Download [Node.js](https://nodejs.org/en/download/).

Run this following commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server
npm run dev

# Run the local server host
npm run host

# Build for production in the dist/ directory
npm run build
```

# Backend Setup

Download [Python](https://www.python.org/downloads/).

Run this following commands:

``` bash
# Install dependencies (only the first time)
pip install

# Run the local server
python3 api/server.py 
```
