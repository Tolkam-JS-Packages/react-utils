import { Children, cloneElement, isValidElement, ReactNode } from 'react';

/**
 * @param children
 * @param walker
 */
const deepChildrenMap = (
    children: ReactNode | ReactNode[] | undefined,
    walker: (child: ReactNode, index?: number, children?: readonly ReactNode[]) => ReactNode)
: ReactNode[] => {
    return Children.toArray(children).map((child, i, elements) => {

        if (isValidElement(child) && child.props.children) {
            const children = deepChildrenMap(child.props.children, walker);
            // return walker(cloneElement(child, {...child.props, children}));
            return walker(child);
        }

        return walker(child, i, elements);
    });
}

export default deepChildrenMap;
