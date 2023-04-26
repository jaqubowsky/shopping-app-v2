/**
 *
 *
 * @export
 * @template T
 * @param {(event: React.SyntheticEvent) => Promise<T>} promise
 * @return {*}
 */
export function onPromise<T>(
  // used to wrap react-hook-forms's submit handler
  // https://github.com/react-hook-form/react-hook-form/discussions/8020#discussioncomment-3429261
  promise: (event: React.SyntheticEvent) => Promise<T>
) {
  return (event: React.SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.error("Unexpected error", error);
      });
    }
  };
}
