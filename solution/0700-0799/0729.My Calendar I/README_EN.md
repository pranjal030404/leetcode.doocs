---
comments: true
difficulty: Medium
edit_url: https://github.com/doocs/leetcode/edit/main/solution/0700-0799/0729.My%20Calendar%20I/README_EN.md
tags:
    - Design
    - Segment Tree
    - Array
    - Binary Search
    - Ordered Set
---

<!-- problem:start -->

# [729. My Calendar I](https://leetcode.com/problems/my-calendar-i)

[中文文档](/solution/0700-0799/0729.My%20Calendar%20I/README.md)

## Description

<!-- description:start -->

<p>You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a <strong>double booking</strong>.</p>

<p>A <strong>double booking</strong> happens when two events have some non-empty intersection (i.e., some moment is common to both events.).</p>

<p>The event can be represented as a pair of integers <code>startTime</code> and <code>endTime</code> that represents a booking on the half-open interval <code>[startTime, endTime)</code>, the range of real numbers <code>x</code> such that <code>startTime &lt;= x &lt; endTime</code>.</p>

<p>Implement the <code>MyCalendar</code> class:</p>

<ul>
	<li><code>MyCalendar()</code> Initializes the calendar object.</li>
	<li><code>boolean book(int startTime, int endTime)</code> Returns <code>true</code> if the event can be added to the calendar successfully without causing a <strong>double booking</strong>. Otherwise, return <code>false</code> and do not add the event to the calendar.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input</strong>
[&quot;MyCalendar&quot;, &quot;book&quot;, &quot;book&quot;, &quot;book&quot;]
[[], [10, 20], [15, 25], [20, 30]]
<strong>Output</strong>
[null, true, false, true]

<strong>Explanation</strong>
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= start &lt; end &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>1000</code> calls will be made to <code>book</code>.</li>
</ul>

<!-- description:end -->

## Solutions

<!-- solution:start -->

### Solution 1: Ordered Set

We can use an ordered set to store the schedule. An ordered set can perform insert, delete, and search operations in $O(\log n)$ time. The elements in the ordered set are sorted by the $\textit{endTime}$ of the schedule in ascending order.

When calling the $\text{book}(start, end)$ method, we search for the first schedule in the ordered set with an end time greater than $\textit{start}$. If it exists and its start time is less than $\textit{end}$, it means there is a double booking, and we return $\text{false}$. Otherwise, we insert $\textit{end}$ as the key and $\textit{start}$ as the value into the ordered set and return $\text{true}$.

The time complexity is $O(n \times \log n)$, and the space complexity is $O(n)$. Here, $n$ is the number of schedules.

<!-- tabs:start -->

#### Python3

```python
class MyCalendar:

    def __init__(self):
        self.sd = SortedDict()

    def book(self, start: int, end: int) -> bool:
        idx = self.sd.bisect_right(start)
        if idx < len(self.sd) and self.sd.values()[idx] < end:
            return False
        self.sd[end] = start
        return True


# Your MyCalendar object will be instantiated and called as such:
# obj = MyCalendar()
# param_1 = obj.book(start,end)
```

#### Java

```java
class MyCalendar {
    private final TreeMap<Integer, Integer> tm = new TreeMap<>();

    public MyCalendar() {
    }

    public boolean book(int startTime, int endTime) {
        var e = tm.ceilingEntry(startTime + 1);
        if (e != null && e.getValue() < endTime) {
            return false;
        }
        tm.put(endTime, startTime);
        return true;
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar obj = new MyCalendar();
 * boolean param_1 = obj.book(startTime,endTime);
 */
```

#### C++

```cpp
class MyCalendar {
public:
    MyCalendar() {
    }

    bool book(int startTime, int endTime) {
        auto e = m.lower_bound(startTime + 1);
        if (e != m.end() && e->second < endTime) {
            return false;
        }
        m[endTime] = startTime;
        return true;
    }

private:
    map<int, int> m;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(startTime,endTime);
 */
```

#### Go

```go
type MyCalendar struct {
	rbt *redblacktree.Tree
}

func Constructor() MyCalendar {
	return MyCalendar{
		rbt: redblacktree.NewWithIntComparator(),
	}
}

func (this *MyCalendar) Book(startTime int, endTime int) bool {
	if p, ok := this.rbt.Ceiling(startTime + 1); ok && p.Value.(int) < endTime {
		return false
	}
	this.rbt.Put(endTime, startTime)
	return true
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Book(startTime,endTime);
 */
```

#### TypeScript

```ts
class MyCalendar {
    tm: TreeMap<number, number>;
    constructor() {
        this.tm = new TreeMap<number, number>();
    }

    book(startTime: number, endTime: number): boolean {
        const e = this.tm.higher(startTime);
        if (e && e[1] < endTime) {
            return false;
        }
        this.tm.set(endTime, startTime);
        return true;
    }
}

type Compare<T> = (lhs: T, rhs: T) => number;

class RBTreeNode<T = number> {
    data: T;
    count: number;
    left: RBTreeNode<T> | null;
    right: RBTreeNode<T> | null;
    parent: RBTreeNode<T> | null;
    color: number;
    constructor(data: T) {
        this.data = data;
        this.left = this.right = this.parent = null;
        this.color = 0;
        this.count = 1;
    }

    sibling(): RBTreeNode<T> | null {
        if (!this.parent) return null; // sibling null if no parent
        return this.isOnLeft() ? this.parent.right : this.parent.left;
    }

    isOnLeft(): boolean {
        return this === this.parent!.left;
    }

    hasRedChild(): boolean {
        return (
            Boolean(this.left && this.left.color === 0) ||
            Boolean(this.right && this.right.color === 0)
        );
    }
}

class RBTree<T> {
    root: RBTreeNode<T> | null;
    lt: (l: T, r: T) => boolean;
    constructor(compare: Compare<T> = (l: T, r: T) => (l < r ? -1 : l > r ? 1 : 0)) {
        this.root = null;
        this.lt = (l: T, r: T) => compare(l, r) < 0;
    }

    rotateLeft(pt: RBTreeNode<T>): void {
        const right = pt.right!;
        pt.right = right.left;

        if (pt.right) pt.right.parent = pt;
        right.parent = pt.parent;

        if (!pt.parent) this.root = right;
        else if (pt === pt.parent.left) pt.parent.left = right;
        else pt.parent.right = right;

        right.left = pt;
        pt.parent = right;
    }

    rotateRight(pt: RBTreeNode<T>): void {
        const left = pt.left!;
        pt.left = left.right;

        if (pt.left) pt.left.parent = pt;
        left.parent = pt.parent;

        if (!pt.parent) this.root = left;
        else if (pt === pt.parent.left) pt.parent.left = left;
        else pt.parent.right = left;

        left.right = pt;
        pt.parent = left;
    }

    swapColor(p1: RBTreeNode<T>, p2: RBTreeNode<T>): void {
        const tmp = p1.color;
        p1.color = p2.color;
        p2.color = tmp;
    }

    swapData(p1: RBTreeNode<T>, p2: RBTreeNode<T>): void {
        const tmp = p1.data;
        p1.data = p2.data;
        p2.data = tmp;
    }

    fixAfterInsert(pt: RBTreeNode<T>): void {
        let parent = null;
        let grandParent = null;

        while (pt !== this.root && pt.color !== 1 && pt.parent?.color === 0) {
            parent = pt.parent;
            grandParent = pt.parent.parent;

            /*  Case : A
                Parent of pt is left child of Grand-parent of pt */
            if (parent === grandParent?.left) {
                const uncle = grandParent.right;

                /* Case : 1
                   The uncle of pt is also red
                   Only Recoloring required */
                if (uncle && uncle.color === 0) {
                    grandParent.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    pt = grandParent;
                } else {
                    /* Case : 2
                       pt is right child of its parent
                       Left-rotation required */
                    if (pt === parent.right) {
                        this.rotateLeft(parent);
                        pt = parent;
                        parent = pt.parent;
                    }

                    /* Case : 3
                       pt is left child of its parent
                       Right-rotation required */
                    this.rotateRight(grandParent);
                    this.swapColor(parent!, grandParent);
                    pt = parent!;
                }
            } else {
                /* Case : B
               Parent of pt is right child of Grand-parent of pt */
                const uncle = grandParent!.left;

                /*  Case : 1
                    The uncle of pt is also red
                    Only Recoloring required */
                if (uncle != null && uncle.color === 0) {
                    grandParent!.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    pt = grandParent!;
                } else {
                    /* Case : 2
                       pt is left child of its parent
                       Right-rotation required */
                    if (pt === parent.left) {
                        this.rotateRight(parent);
                        pt = parent;
                        parent = pt.parent;
                    }

                    /* Case : 3
                       pt is right child of its parent
                       Left-rotation required */
                    this.rotateLeft(grandParent!);
                    this.swapColor(parent!, grandParent!);
                    pt = parent!;
                }
            }
        }
        this.root!.color = 1;
    }

    delete(val: T): boolean {
        const node = this.find(val);
        if (!node) return false;
        node.count--;
        if (!node.count) this.deleteNode(node);
        return true;
    }

    deleteAll(val: T): boolean {
        const node = this.find(val);
        if (!node) return false;
        this.deleteNode(node);
        return true;
    }

    deleteNode(v: RBTreeNode<T>): void {
        const u = BSTreplace(v);

        // True when u and v are both black
        const uvBlack = (u === null || u.color === 1) && v.color === 1;
        const parent = v.parent!;

        if (!u) {
            // u is null therefore v is leaf
            if (v === this.root) this.root = null;
            // v is root, making root null
            else {
                if (uvBlack) {
                    // u and v both black
                    // v is leaf, fix double black at v
                    this.fixDoubleBlack(v);
                } else {
                    // u or v is red
                    if (v.sibling()) {
                        // sibling is not null, make it red"
                        v.sibling()!.color = 0;
                    }
                }
                // delete v from the tree
                if (v.isOnLeft()) parent.left = null;
                else parent.right = null;
            }
            return;
        }

        if (!v.left || !v.right) {
            // v has 1 child
            if (v === this.root) {
                // v is root, assign the value of u to v, and delete u
                v.data = u.data;
                v.left = v.right = null;
            } else {
                // Detach v from tree and move u up
                if (v.isOnLeft()) parent.left = u;
                else parent.right = u;
                u.parent = parent;
                if (uvBlack) this.fixDoubleBlack(u);
                // u and v both black, fix double black at u
                else u.color = 1; // u or v red, color u black
            }
            return;
        }

        // v has 2 children, swap data with successor and recurse
        this.swapData(u, v);
        this.deleteNode(u);

        // find node that replaces a deleted node in BST
        function BSTreplace(x: RBTreeNode<T>): RBTreeNode<T> | null {
            // when node have 2 children
            if (x.left && x.right) return successor(x.right);
            // when leaf
            if (!x.left && !x.right) return null;
            // when single child
            return x.left ?? x.right;
        }
        // find node that do not have a left child
        // in the subtree of the given node
        function successor(x: RBTreeNode<T>): RBTreeNode<T> {
            let temp = x;
            while (temp.left) temp = temp.left;
            return temp;
        }
    }

    fixDoubleBlack(x: RBTreeNode<T>): void {
        if (x === this.root) return; // Reached root

        const sibling = x.sibling();
        const parent = x.parent!;
        if (!sibling) {
            // No sibiling, double black pushed up
            this.fixDoubleBlack(parent);
        } else {
            if (sibling.color === 0) {
                // Sibling red
                parent.color = 0;
                sibling.color = 1;
                if (sibling.isOnLeft()) this.rotateRight(parent);
                // left case
                else this.rotateLeft(parent); // right case
                this.fixDoubleBlack(x);
            } else {
                // Sibling black
                if (sibling.hasRedChild()) {
                    // at least 1 red children
                    if (sibling.left && sibling.left.color === 0) {
                        if (sibling.isOnLeft()) {
                            // left left
                            sibling.left.color = sibling.color;
                            sibling.color = parent.color;
                            this.rotateRight(parent);
                        } else {
                            // right left
                            sibling.left.color = parent.color;
                            this.rotateRight(sibling);
                            this.rotateLeft(parent);
                        }
                    } else {
                        if (sibling.isOnLeft()) {
                            // left right
                            sibling.right!.color = parent.color;
                            this.rotateLeft(sibling);
                            this.rotateRight(parent);
                        } else {
                            // right right
                            sibling.right!.color = sibling.color;
                            sibling.color = parent.color;
                            this.rotateLeft(parent);
                        }
                    }
                    parent.color = 1;
                } else {
                    // 2 black children
                    sibling.color = 0;
                    if (parent.color === 1) this.fixDoubleBlack(parent);
                    else parent.color = 1;
                }
            }
        }
    }

    insert(data: T): boolean {
        // search for a position to insert
        let parent = this.root;
        while (parent) {
            if (this.lt(data, parent.data)) {
                if (!parent.left) break;
                else parent = parent.left;
            } else if (this.lt(parent.data, data)) {
                if (!parent.right) break;
                else parent = parent.right;
            } else break;
        }

        // insert node into parent
        const node = new RBTreeNode(data);
        if (!parent) this.root = node;
        else if (this.lt(node.data, parent.data)) parent.left = node;
        else if (this.lt(parent.data, node.data)) parent.right = node;
        else {
            parent.count++;
            return false;
        }
        node.parent = parent;
        this.fixAfterInsert(node);
        return true;
    }

    search(predicate: (val: T) => boolean, direction: 'left' | 'right'): T | undefined {
        let p = this.root;
        let result = null;
        while (p) {
            if (predicate(p.data)) {
                result = p;
                p = p[direction];
            } else {
                p = p[direction === 'left' ? 'right' : 'left'];
            }
        }
        return result?.data;
    }

    find(data: T): RBTreeNode<T> | null {
        let p = this.root;
        while (p) {
            if (this.lt(data, p.data)) {
                p = p.left;
            } else if (this.lt(p.data, data)) {
                p = p.right;
            } else break;
        }
        return p ?? null;
    }

    count(data: T): number {
        const node = this.find(data);
        return node ? node.count : 0;
    }

    *inOrder(root: RBTreeNode<T> = this.root!): Generator<T, undefined, void> {
        if (!root) return;
        for (const v of this.inOrder(root.left!)) yield v;
        yield root.data;
        for (const v of this.inOrder(root.right!)) yield v;
    }

    *reverseInOrder(root: RBTreeNode<T> = this.root!): Generator<T, undefined, void> {
        if (!root) return;
        for (const v of this.reverseInOrder(root.right!)) yield v;
        yield root.data;
        for (const v of this.reverseInOrder(root.left!)) yield v;
    }
}

class TreeMap<K = number, V = unknown> {
    _size: number;
    tree: RBTree<K>;
    map: Map<K, V> = new Map();
    compare: Compare<K>;
    constructor(
        collection: Array<[K, V]> | Compare<K> = [],
        compare: Compare<K> = (l: K, r: K) => (l < r ? -1 : l > r ? 1 : 0),
    ) {
        if (typeof collection === 'function') {
            compare = collection;
            collection = [];
        }
        this._size = 0;
        this.compare = compare;
        this.tree = new RBTree(compare);
        for (const [key, val] of collection) this.set(key, val);
    }

    size(): number {
        return this._size;
    }

    has(key: K): boolean {
        return !!this.tree.find(key);
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    set(key: K, val: V): boolean {
        const successful = this.tree.insert(key);
        this._size += successful ? 1 : 0;
        this.map.set(key, val);
        return successful;
    }

    delete(key: K): boolean {
        const deleted = this.tree.deleteAll(key);
        this._size -= deleted ? 1 : 0;
        return deleted;
    }

    ceil(target: K): [K, V] | undefined {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) >= 0, 'left'));
    }

    floor(target: K): [K, V] | undefined {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) <= 0, 'right'));
    }

    higher(target: K): [K, V] | undefined {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) > 0, 'left'));
    }

    lower(target: K): [K, V] | undefined {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) < 0, 'right'));
    }

    first(): [K, V] | undefined {
        return this.toKeyValue(this.tree.inOrder().next().value);
    }

    last(): [K, V] | undefined {
        return this.toKeyValue(this.tree.reverseInOrder().next().value);
    }

    shift(): [K, V] | undefined {
        const first = this.first();
        if (first === undefined) return undefined;
        this.delete(first[0]);
        return first;
    }

    pop(): [K, V] | undefined {
        const last = this.last();
        if (last === undefined) return undefined;
        this.delete(last[0]);
        return last;
    }

    toKeyValue(key: K): [K, V];
    toKeyValue(key: undefined): undefined;
    toKeyValue(key: K | undefined): [K, V] | undefined;
    toKeyValue(key: K | undefined): [K, V] | undefined {
        return key != null ? [key, this.map.get(key)!] : undefined;
    }

    *[Symbol.iterator](): Generator<[K, V], void, void> {
        for (const key of this.keys()) yield this.toKeyValue(key);
    }

    *keys(): Generator<K, void, void> {
        for (const key of this.tree.inOrder()) yield key;
    }

    *values(): Generator<V, undefined, void> {
        for (const key of this.keys()) yield this.map.get(key)!;
        return undefined;
    }

    *rkeys(): Generator<K, undefined, void> {
        for (const key of this.tree.reverseInOrder()) yield key;
        return undefined;
    }

    *rvalues(): Generator<V, undefined, void> {
        for (const key of this.rkeys()) yield this.map.get(key)!;
        return undefined;
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
```

#### Rust

```rust
use std::collections::BTreeMap;

struct MyCalendar {
    tm: BTreeMap<i32, i32>,
}

impl MyCalendar {
    fn new() -> Self {
        MyCalendar {
            tm: BTreeMap::new(),
        }
    }

    fn book(&mut self, start_time: i32, end_time: i32) -> bool {
        if let Some((&key, &value)) = self.tm.range(start_time + 1..).next() {
            if value < end_time {
                return false;
            }
        }
        self.tm.insert(end_time, start_time);
        true
    }
}
```

#### JavaScript

```js
var MyCalendar = function () {
    this.tm = new TreeMap();
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
    const e = this.tm.higher(startTime);
    if (e && e[1] < endTime) {
        return false;
    }
    this.tm.set(endTime, startTime);
    return true;
};

var RBTreeNode = class {
    constructor(data) {
        this.data = data;
        this.left = this.right = this.parent = null;
        this.color = 0;
        this.count = 1;
    }
    sibling() {
        if (!this.parent) return null;
        return this.isOnLeft() ? this.parent.right : this.parent.left;
    }
    isOnLeft() {
        return this === this.parent.left;
    }
    hasRedChild() {
        return (
            Boolean(this.left && this.left.color === 0) ||
            Boolean(this.right && this.right.color === 0)
        );
    }
};
var RBTree = class {
    constructor(compare = (l, r) => (l < r ? -1 : l > r ? 1 : 0)) {
        this.root = null;
        this.lt = (l, r) => compare(l, r) < 0;
    }
    rotateLeft(pt) {
        const right = pt.right;
        pt.right = right.left;
        if (pt.right) pt.right.parent = pt;
        right.parent = pt.parent;
        if (!pt.parent) this.root = right;
        else if (pt === pt.parent.left) pt.parent.left = right;
        else pt.parent.right = right;
        right.left = pt;
        pt.parent = right;
    }
    rotateRight(pt) {
        const left = pt.left;
        pt.left = left.right;
        if (pt.left) pt.left.parent = pt;
        left.parent = pt.parent;
        if (!pt.parent) this.root = left;
        else if (pt === pt.parent.left) pt.parent.left = left;
        else pt.parent.right = left;
        left.right = pt;
        pt.parent = left;
    }
    swapColor(p1, p2) {
        const tmp = p1.color;
        p1.color = p2.color;
        p2.color = tmp;
    }
    swapData(p1, p2) {
        const tmp = p1.data;
        p1.data = p2.data;
        p2.data = tmp;
    }
    fixAfterInsert(pt) {
        var _a;
        let parent = null;
        let grandParent = null;
        while (
            pt !== this.root &&
            pt.color !== 1 &&
            ((_a = pt.parent) == null ? void 0 : _a.color) === 0
        ) {
            parent = pt.parent;
            grandParent = pt.parent.parent;
            if (parent === (grandParent == null ? void 0 : grandParent.left)) {
                const uncle = grandParent.right;
                if (uncle && uncle.color === 0) {
                    grandParent.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    pt = grandParent;
                } else {
                    if (pt === parent.right) {
                        this.rotateLeft(parent);
                        pt = parent;
                        parent = pt.parent;
                    }
                    this.rotateRight(grandParent);
                    this.swapColor(parent, grandParent);
                    pt = parent;
                }
            } else {
                const uncle = grandParent.left;
                if (uncle != null && uncle.color === 0) {
                    grandParent.color = 0;
                    parent.color = 1;
                    uncle.color = 1;
                    pt = grandParent;
                } else {
                    if (pt === parent.left) {
                        this.rotateRight(parent);
                        pt = parent;
                        parent = pt.parent;
                    }
                    this.rotateLeft(grandParent);
                    this.swapColor(parent, grandParent);
                    pt = parent;
                }
            }
        }
        this.root.color = 1;
    }
    delete(val) {
        const node = this.find(val);
        if (!node) return false;
        node.count--;
        if (!node.count) this.deleteNode(node);
        return true;
    }
    deleteAll(val) {
        const node = this.find(val);
        if (!node) return false;
        this.deleteNode(node);
        return true;
    }
    deleteNode(v) {
        const u = BSTreplace(v);
        const uvBlack = (u === null || u.color === 1) && v.color === 1;
        const parent = v.parent;
        if (!u) {
            if (v === this.root) this.root = null;
            else {
                if (uvBlack) {
                    this.fixDoubleBlack(v);
                } else {
                    if (v.sibling()) {
                        v.sibling().color = 0;
                    }
                }
                if (v.isOnLeft()) parent.left = null;
                else parent.right = null;
            }
            return;
        }
        if (!v.left || !v.right) {
            if (v === this.root) {
                v.data = u.data;
                v.left = v.right = null;
            } else {
                if (v.isOnLeft()) parent.left = u;
                else parent.right = u;
                u.parent = parent;
                if (uvBlack) this.fixDoubleBlack(u);
                else u.color = 1;
            }
            return;
        }
        this.swapData(u, v);
        this.deleteNode(u);
        function BSTreplace(x) {
            var _a;
            if (x.left && x.right) return successor(x.right);
            if (!x.left && !x.right) return null;
            return (_a = x.left) != null ? _a : x.right;
        }
        function successor(x) {
            let temp = x;
            while (temp.left) temp = temp.left;
            return temp;
        }
    }
    fixDoubleBlack(x) {
        if (x === this.root) return;
        const sibling = x.sibling();
        const parent = x.parent;
        if (!sibling) {
            this.fixDoubleBlack(parent);
        } else {
            if (sibling.color === 0) {
                parent.color = 0;
                sibling.color = 1;
                if (sibling.isOnLeft()) this.rotateRight(parent);
                else this.rotateLeft(parent);
                this.fixDoubleBlack(x);
            } else {
                if (sibling.hasRedChild()) {
                    if (sibling.left && sibling.left.color === 0) {
                        if (sibling.isOnLeft()) {
                            sibling.left.color = sibling.color;
                            sibling.color = parent.color;
                            this.rotateRight(parent);
                        } else {
                            sibling.left.color = parent.color;
                            this.rotateRight(sibling);
                            this.rotateLeft(parent);
                        }
                    } else {
                        if (sibling.isOnLeft()) {
                            sibling.right.color = parent.color;
                            this.rotateLeft(sibling);
                            this.rotateRight(parent);
                        } else {
                            sibling.right.color = sibling.color;
                            sibling.color = parent.color;
                            this.rotateLeft(parent);
                        }
                    }
                    parent.color = 1;
                } else {
                    sibling.color = 0;
                    if (parent.color === 1) this.fixDoubleBlack(parent);
                    else parent.color = 1;
                }
            }
        }
    }
    insert(data) {
        let parent = this.root;
        while (parent) {
            if (this.lt(data, parent.data)) {
                if (!parent.left) break;
                else parent = parent.left;
            } else if (this.lt(parent.data, data)) {
                if (!parent.right) break;
                else parent = parent.right;
            } else break;
        }
        const node = new RBTreeNode(data);
        if (!parent) this.root = node;
        else if (this.lt(node.data, parent.data)) parent.left = node;
        else if (this.lt(parent.data, node.data)) parent.right = node;
        else {
            parent.count++;
            return false;
        }
        node.parent = parent;
        this.fixAfterInsert(node);
        return true;
    }
    search(predicate, direction) {
        let p = this.root;
        let result = null;
        while (p) {
            if (predicate(p.data)) {
                result = p;
                p = p[direction];
            } else {
                p = p[direction === 'left' ? 'right' : 'left'];
            }
        }
        return result == null ? void 0 : result.data;
    }
    find(data) {
        let p = this.root;
        while (p) {
            if (this.lt(data, p.data)) {
                p = p.left;
            } else if (this.lt(p.data, data)) {
                p = p.right;
            } else break;
        }
        return p != null ? p : null;
    }
    count(data) {
        const node = this.find(data);
        return node ? node.count : 0;
    }
    *inOrder(root = this.root) {
        if (!root) return;
        for (const v of this.inOrder(root.left)) yield v;
        yield root.data;
        for (const v of this.inOrder(root.right)) yield v;
    }
    *reverseInOrder(root = this.root) {
        if (!root) return;
        for (const v of this.reverseInOrder(root.right)) yield v;
        yield root.data;
        for (const v of this.reverseInOrder(root.left)) yield v;
    }
};

// src/treemap.ts
var TreeMap = class {
    constructor(collection = [], compare = (l, r) => (l < r ? -1 : l > r ? 1 : 0)) {
        this.map = new Map();
        if (typeof collection === 'function') {
            compare = collection;
            collection = [];
        }
        this._size = 0;
        this.compare = compare;
        this.tree = new RBTree(compare);
        for (const [key, val] of collection) this.set(key, val);
    }
    size() {
        return this._size;
    }
    has(key) {
        return !!this.tree.find(key);
    }
    get(key) {
        return this.map.get(key);
    }
    set(key, val) {
        const successful = this.tree.insert(key);
        this._size += successful ? 1 : 0;
        this.map.set(key, val);
        return successful;
    }
    delete(key) {
        const deleted = this.tree.deleteAll(key);
        this._size -= deleted ? 1 : 0;
        return deleted;
    }
    ceil(target) {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) >= 0, 'left'));
    }
    floor(target) {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) <= 0, 'right'));
    }
    higher(target) {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) > 0, 'left'));
    }
    lower(target) {
        return this.toKeyValue(this.tree.search(key => this.compare(key, target) < 0, 'right'));
    }
    first() {
        return this.toKeyValue(this.tree.inOrder().next().value);
    }
    last() {
        return this.toKeyValue(this.tree.reverseInOrder().next().value);
    }
    shift() {
        const first = this.first();
        if (first === void 0) return void 0;
        this.delete(first[0]);
        return first;
    }
    pop() {
        const last = this.last();
        if (last === void 0) return void 0;
        this.delete(last[0]);
        return last;
    }
    toKeyValue(key) {
        return key != null ? [key, this.map.get(key)] : void 0;
    }
    *[Symbol.iterator]() {
        for (const key of this.keys()) yield this.toKeyValue(key);
    }
    *keys() {
        for (const key of this.tree.inOrder()) yield key;
    }
    *values() {
        for (const key of this.keys()) yield this.map.get(key);
        return void 0;
    }
    *rkeys() {
        for (const key of this.tree.reverseInOrder()) yield key;
        return void 0;
    }
    *rvalues() {
        for (const key of this.rkeys()) yield this.map.get(key);
        return void 0;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
```

<!-- tabs:end -->

<!-- solution:end -->

<!-- problem:end -->
