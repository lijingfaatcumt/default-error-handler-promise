when i use axios, i am confused about error handler, because i want to process axios error unified, for example pop up error message, but i some page, i want to process the axios error with different type, in that case, i do not know how to do.

so i publish the package to solve axios error with balanceing handling unified error and special error.

The usage is as follows, take axios interceptors for example

```javascript

axios.interceptors.response.use(
  (response) => {
    const {
      data,
      data: { code }
    } = response
    if (code !== 200) {
      // if you do not process the error, the error will procesed as print
      return new DefaultErrorHandlerPromise(
        Promise.reject(response, () => console.log('错误将会被统一输出'))
      )
    }
    return data
  },
  (err) => {
    return new DefaultErrorHandlerPromise(
      Promise.reject(response, () => console.log('错误将会被统一输出'))
    )
  }
)

```

when you request, if you will not process the error specially, you should code as follow

```javascript

axios('xxxxx').then(() => {})

```

if you want to  process the error specially, you should code as follow

```javascript

axios('xxxx').then(() => {}).catch(error => {
  // process the error specially
})

```

about Promise.all and Promise.race, you can use DefaultErrorHandlerPromise.all and DefaultErrorHandlerPromise.race as follows

```javascript

DefaultErrorHandlerPromise.all(
  [promise1, promise2], 
  defaultErrorHandler /*defaultErrorHandler*/ ).then(() => {}
)

DefaultErrorHandlerPromise.race(
  [promise1, promise2], 
  defaultErrorHandler /*defaultErrorHandler*/ ).then(() => {}
)

```

if you want to process erros specially, you can do as follows

```javascript
DefaultErrorHandlerPromise.all(
  [promise1, promise2], 
  defaultErrorHandler /*defaultErrorHandler*/ 
).then(() => {}).catch(error => {
  // process the error specially
})

DefaultErrorHandlerPromise.all(
  [promise1, promise2], 
  defaultErrorHandler /*defaultErrorHandler*/ 
).then(() => {}).catch(error => {
  // process the error specially
})

```
