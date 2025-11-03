// Minimal shim for `react-dom` used in web-only utilities (e.g. flushSync).
// This provides a safe noop implementation for native builds so Metro can
// resolve the module without pulling in react-dom (web) and causing bundling errors.

function flushSync(cb) {
  // flushSync ensures React state updates are flushed synchronously on web.
  // For native, we can just call the callback directly.
  try {
    return cb();
  } catch (e) {
    // swallow errors here so shim never crashes bundler; rethrow to preserve behavior.
    throw e;
  }
}

// Export for both CommonJS and ESM consumers
module.exports = {
  flushSync,
  __esModule: true,
  default: {
    flushSync,
  },
};
