import { Ref } from 'react';

export const fillRef = <T>(ref: Ref<T>, node: T) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node;
  }
};

/**
 * Merge refs into one ref function to support ref passing.
 */
export const composeRef = <T>(...refs: Ref<T>[]): Ref<T> => {
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
};

export const supportRef = (nodeOrComponent: any): boolean => {
  // Function component node
  if (
    nodeOrComponent?.type?.prototype &&
    !nodeOrComponent.type.prototype.render
  ) {
    return false;
  }

  // Class component
  if (
    typeof nodeOrComponent === 'function' &&
    nodeOrComponent.prototype &&
    !nodeOrComponent.prototype.render
  ) {
    return false;
  }
  return true;
};
