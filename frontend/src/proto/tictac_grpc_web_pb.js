/**
 * @fileoverview gRPC-Web generated client stub for tictac
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.tictac = require('./tictac_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.tictac.GameClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.tictac.GamePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tictac.connectRequest,
 *   !proto.tictac.connectResponse>}
 */
const methodDescriptor_Game_Connect = new grpc.web.MethodDescriptor(
  '/tictac.Game/Connect',
  grpc.web.MethodType.UNARY,
  proto.tictac.connectRequest,
  proto.tictac.connectResponse,
  /**
   * @param {!proto.tictac.connectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictac.connectResponse.deserializeBinary
);


/**
 * @param {!proto.tictac.connectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tictac.connectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tictac.connectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tictac.GameClient.prototype.connect =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tictac.Game/Connect',
      request,
      metadata || {},
      methodDescriptor_Game_Connect,
      callback);
};


/**
 * @param {!proto.tictac.connectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tictac.connectResponse>}
 *     Promise that resolves to the response
 */
proto.tictac.GamePromiseClient.prototype.connect =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tictac.Game/Connect',
      request,
      metadata || {},
      methodDescriptor_Game_Connect);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tictac.Request,
 *   !proto.tictac.Response>}
 */
const methodDescriptor_Game_Stream = new grpc.web.MethodDescriptor(
  '/tictac.Game/Stream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.tictac.Request,
  proto.tictac.Response,
  /**
   * @param {!proto.tictac.Request} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictac.Response.deserializeBinary
);


/**
 * @param {!proto.tictac.Request} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.tictac.Response>}
 *     The XHR Node Readable Stream
 */
proto.tictac.GameClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/tictac.Game/Stream',
      request,
      metadata || {},
      methodDescriptor_Game_Stream);
};


/**
 * @param {!proto.tictac.Request} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.tictac.Response>}
 *     The XHR Node Readable Stream
 */
proto.tictac.GamePromiseClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/tictac.Game/Stream',
      request,
      metadata || {},
      methodDescriptor_Game_Stream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tictac.updateRequest,
 *   !proto.tictac.Status>}
 */
const methodDescriptor_Game_Update = new grpc.web.MethodDescriptor(
  '/tictac.Game/Update',
  grpc.web.MethodType.UNARY,
  proto.tictac.updateRequest,
  proto.tictac.Status,
  /**
   * @param {!proto.tictac.updateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictac.Status.deserializeBinary
);


/**
 * @param {!proto.tictac.updateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tictac.Status)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tictac.Status>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tictac.GameClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tictac.Game/Update',
      request,
      metadata || {},
      methodDescriptor_Game_Update,
      callback);
};


/**
 * @param {!proto.tictac.updateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tictac.Status>}
 *     Promise that resolves to the response
 */
proto.tictac.GamePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tictac.Game/Update',
      request,
      metadata || {},
      methodDescriptor_Game_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tictac.StartRequest,
 *   !proto.tictac.StartResponse>}
 */
const methodDescriptor_Game_StartGame = new grpc.web.MethodDescriptor(
  '/tictac.Game/StartGame',
  grpc.web.MethodType.UNARY,
  proto.tictac.StartRequest,
  proto.tictac.StartResponse,
  /**
   * @param {!proto.tictac.StartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tictac.StartResponse.deserializeBinary
);


/**
 * @param {!proto.tictac.StartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tictac.StartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tictac.StartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tictac.GameClient.prototype.startGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tictac.Game/StartGame',
      request,
      metadata || {},
      methodDescriptor_Game_StartGame,
      callback);
};


/**
 * @param {!proto.tictac.StartRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tictac.StartResponse>}
 *     Promise that resolves to the response
 */
proto.tictac.GamePromiseClient.prototype.startGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tictac.Game/StartGame',
      request,
      metadata || {},
      methodDescriptor_Game_StartGame);
};


module.exports = proto.tictac;

