function* func() {
    console.log("one");
    yield '1';
    console.log("two");
    yield '2';
    console.log("three");
    return '3';
}

const f = func()
f.next();
// one
// {value: "1", done: false}
f.next();
// two
// {value: "2", done: false}
f.next();
// three
// {value: "3", done: true}
f.next();
// {value: undefined, done: true}

// 或者通过迭代器
for (const [key,value] of func()) {
    console.log(`${key}: ${value}`);
}
