# Suspense
- 跨层级等待异步依赖项

- 与React Suspense
  - Fiber runtime 

- 特点 不通过运行时调度实现



- 嵌套组件树预先渲染 

- 记录异步依赖

  

- 使用async setup实现
  - 组件树先在内存中预先渲染
  - 运行时收集组件树内所有异步函数Promse（比如：ajax请求）
  - 当所有Promise被resolve后才会把组件树渲染到Dom

- async stetup 异步原语





