import React, { useState } from "react";

export interface UseRequest<R> {
    response: R | Error | null;
    isLoading: boolean;
    makeRequest: () => void;
}

export function isResponseError<R>(
    response: R | Error | null,
): response is Error {
    return response instanceof Error;
}

export function useRequest<Response>(
    request: () => Promise<Response>,
): UseRequest<Response> {
    const [response, setResponse] = React.useState<Response | null | Error>(null);
    const [loading, setLoading] = useState(false);

    const makeRequest = React.useCallback(() => {
        setLoading(true);
        request().then(result => {
            if (isResponseError(result)) {
                setResponse(new Error("There was an error while fetching data"));
            } else {
                setResponse(result);
            }
            setLoading(false);
        }).catch(error => {
            if (isResponseError(error)) {
                setResponse(error);
            }
            setLoading(false);
        });
    }, [request]);

    return {
        response: response,
        isLoading: loading,
        makeRequest: makeRequest,
    };
}
