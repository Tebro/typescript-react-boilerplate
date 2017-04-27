import * as React from "react";

/**
 * A nice testable example function
 * @param target
 */
export function hello(target: string): string {
    return `Hello ${target}`;
}

export const App = () => (
    <h1>{hello("World")}</h1>
)
