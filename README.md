在统一请求的地方，需要这么写

```javascript

export const request = (config){
  return new DefaultErrorHandlerPromise(service.request(config), () => {
    console.log('统一处理');
  });
};

```

when you request, if you will not process the error specially, you should code as follow

```javascript

request('xxxxx').then(() => {})

```

if you want to  process the error specially, you should code as follow

```javascript

request('xxxx').then(() => {}).catch(error => {
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
