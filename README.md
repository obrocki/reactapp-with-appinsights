# React app with Application Insights

> :warning: **WARNING: This is not a production code but a sample proof of concept (POC). Use at your own risk.**

## Setup

Update the `connectionString` in the `AppInsights.tsx` file with your Application Insights Instrumentation Key. You can find this on line 20:

```typescriptreact
connectionString: "instrumentationKey=your instrumentation connection string",
```

Update the `ConnectionString` in the `appsettings.json` file with your Application Insights Instrumentation Key. You can find this on line 10:

```json
"ConnectionString": "your instrumentation connection string"
111