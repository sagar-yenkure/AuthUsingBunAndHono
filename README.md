
# Bun

Bun is a tool that simplifies TypeScript execution in backend projects, providing seamless integration and efficient runtime handling.

## Features

- **TypeScript Support**: Execute TypeScript files directly without the need for a separate compilation step.
- **Efficiency**: Streamline development by reducing setup complexity and improving code maintenance.
- **Flexibility**: Maintain the flexibility of TypeScript while benefiting from simplified execution.

## Getting Started

### Prerequisites

- npm or bun

### Installation

To install Bun globally and use it in your project:

```bash
npm install -g @bun/cli
# or
yarn global add @bun/cli
```

### Usage

1. **Running TypeScript Files**:
   Execute a TypeScript file using Bun:
   ```bash
   bun run index.ts
   ```

2. **Watching for Changes**:
   Use Bun to watch for file changes and automatically restart:
   ```bash
   bun run --watch index.ts
   ```

### Example

To run a sample TypeScript file `index.ts` with Bun:

```bash
bun run index.ts
```
