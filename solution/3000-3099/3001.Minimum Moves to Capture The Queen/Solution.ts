function minMovesToCaptureTheQueen(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
): number {
    if (a === e && (c !== a || (d - b) * (d - f) > 0)) {
        return 1;
    }
    if (b === f && (d !== b || (c - a) * (c - e) > 0)) {
        return 1;
    }
    if (c - e === d - f && (a - e !== b - f || (a - c) * (a - e) > 0)) {
        return 1;
    }
    if (c - e === f - d && (a - e !== f - b || (a - c) * (a - e) > 0)) {
        return 1;
    }
    return 2;
}
