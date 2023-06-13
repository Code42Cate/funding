# Logger

This library is used to log messages to the console or logfile (depending on the environment). It is based on [winston](https://github.com/winstonjs/winston).

## Usage

```typescript
import { Logger } from '@funding-database/logger';

const logger = Logger('eu-scraper'); // identifier for the logger

logger.info('Hello world')
```