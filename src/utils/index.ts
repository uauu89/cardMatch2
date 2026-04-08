export function syncDelay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}