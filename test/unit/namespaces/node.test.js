"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var spell_1 = __importDefault(require("../../../lib/spell"));
var expect = chai.expect;
chai.use(sinonChai);
describe("#Node", function () {
    var spell;
    var client;
    function makeClientStub(err, resp) {
        return sinon.stub(client.client, "call").callsArgWith(3, err, resp);
    }
    beforeEach(function (done) {
        spell = new spell_1.default();
        client = spell.rpcClient;
        client.client = {
            call: function (method, params, option, cb) {
                cb(null, null);
            },
        };
        done();
    });
    describe("#getTransactionStatus", function () {
        it("should return 'unknown' when transaction hash is not known", function () { return __awaiter(_this, void 0, void 0, function () {
            var hash, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = "0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
                        mock = makeClientStub(null, { status: "unknown" });
                        return [4 /*yield*/, spell.node.getTransactionStatus(hash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
                        expect(result).to.be.eq("unknown");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var hash, mock;
            return __generator(this, function (_a) {
                hash = "0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
                mock = makeClientStub(new Error("bad hash"), null);
                spell.node.getTransactionStatus(hash).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
                    expect(err.message).to.be.eq("bad hash");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#getSyncStat", function () {
        it("should return sync state", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            currentChainHeight: 100,
                            currentTotalDifficulty: 100,
                            progressPercent: 100,
                            targetChainHeight: 100,
                            targetTotalDifficulty: 22999999,
                        };
                        mock = makeClientStub(null, expected);
                        return [4 /*yield*/, spell.node.getSyncStat()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getSyncStat", null);
                        expect(result).to.be.deep.eq(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.getSyncStat().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_getSyncStat", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#isSyncing", function () {
        it("should return sync status", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = false;
                        mock = makeClientStub(null, expected);
                        return [4 /*yield*/, spell.node.isSyncing()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_isSyncing", null);
                        expect(result).to.be.deep.eq(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.isSyncing().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_isSyncing", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#info", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.info()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_info", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.info().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_info", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#config", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.config()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_config", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.config().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_config", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#basic", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.basic()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_basic", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.basic().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_basic", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#getTransactionFromPool", function () {
        var txHash = "0x48b9bff17fffe090e707bd90910f58bd";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.node.getTransactionFromPool(txHash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getTransactionFromPool", txHash);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("unknown transaction"), 1234);
            spell.node.getTransactionFromPool(txHash).catch(function (err) {
                expect(err.message).to.be.eq("unknown transaction");
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("node_getTransactionFromPool", txHash);
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9uYW1lc3BhY2VzL25vZGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkE0TEE7O0FBNUxBLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMsc0NBQXlDO0FBR3pDLDZEQUF1QztBQUN2QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEIsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNqQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFFdEIsU0FBUyxjQUFjLENBQUMsR0FBaUIsRUFBRSxJQUFTO1FBQ25ELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBQyxJQUFJO1FBQ2YsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7UUFDcEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRztZQUNmLElBQUksRUFBRSxVQUNMLE1BQWMsRUFDZCxNQUFXLEVBQ1gsTUFBc0IsRUFDdEIsRUFBOEI7Z0JBRTlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQztTQUNELENBQUM7UUFDRixJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ2pDLEVBQUUsQ0FBQyw0REFBNEQsRUFBRTs7Ozs7d0JBQzFELElB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