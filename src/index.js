const HandleType = {
  unHandled: 0,
  then: 1,
  catch: 2
}
class DefaultErrorHandlerPromise{
  constructor(promise, defaultErrorHandler) {
    this.defaultErrorHandler = defaultErrorHandler
    this.origin = promise
    promise.catch((err) => {
      if (this.handleType === HandleType.unHandled) {
        this.defaultErrorHandler?.call(null, err)
      }
    })
    this.handleType = HandleType.unHandled
  }

  then(sucessHandler, errorHandler) {
    if (errorHandler != null) {
      this.handleType |= HandleType.catch
    } 
    if(sucessHandler != null) {
      this.handleType |= HandleType.then
    }
    const promise = this.origin.then(sucessHandler, errorHandler)
    return new DefaultErrorHandlerPromise(promise, this.defaultErrorHandler)
  }

  catch(errorHandler) {
    this.handleType |= HandleType.catch
    const promise = this.origin.catch(errorHandler)
    return new DefaultErrorHandlerPromise(promise, this.defaultErrorHandler)
  }

  static all(promises, defaultErrorHandler) {
    return new DefaultErrorHandlerPromise(Promise.all(promises), defaultErrorHandler)
  }

  static race(promises, defaultErrorHandler) {
    return new DefaultErrorHandlerPromise(Promise.race(promises), defaultErrorHandler)
  }
}
