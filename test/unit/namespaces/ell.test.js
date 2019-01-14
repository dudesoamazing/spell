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
var lib_1 = require("../../../lib");
var decimal_js_1 = __importDefault(require("decimal.js"));
var transaction_builder_1 = require("../../../lib/builders/transaction_builder");
var expect = chai.expect;
chai.use(sinonChai);
describe("#Auth", function () {
    var spell;
    var client;
    var pk;
    var testTx;
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
        pk = lib_1.PrivateKey.from("wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24ostkmKA9egwH3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq");
        testTx = {
            from: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
            to: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
            type: 1,
            senderPubKey: pk.publicKey().toBase58(),
            value: "1",
            fee: "1",
            timestamp: 1547285790,
            nonce: 1,
        };
        done();
    });
    describe(".send", function () {
        it("should call method ell_send", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.ell.send(testTx)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("ell_send", testTx);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.ell.send(testTx).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("ell_send", testTx);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe(".send", function () {
        it("should call method ell_getBalance and return Decimal", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, "10.20");
                        return [4 /*yield*/, spell.ell.getBalance(pk.toAddress().toString())];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("ell_getBalance", pk.toAddress().toString());
                        expect(result).to.be.an.instanceOf(decimal_js_1.default);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.ell.getBalance(pk.toAddress().toString()).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("ell_getBalance", pk.toAddress().toString());
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe(".balance", function () {
        it("should return an instance of TxBalanceBuilder", function () {
            expect(spell.ell.balance()).to.be.an.instanceOf(transaction_builder_1.TxBalanceBuilder);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdC91bml0L25hbWVzcGFjZXMvZWxsLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBcUdBOztBQXJHQSwyQkFBOEI7QUFDOUIsNkJBQWdDO0FBQ2hDLHNDQUF5QztBQUV6Qyw2REFBdUM7QUFDdkMsb0NBQTBDO0FBQzFDLDBEQUFpQztBQUNqQyxpRkFBNkU7QUFDN0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxPQUFPLEVBQUU7SUFDakIsSUFBSSxLQUFZLENBQUM7SUFDakIsSUFBSSxNQUFpQixDQUFDO0lBQ3RCLElBQUksRUFBYyxDQUFDO0lBQ25CLElBQUksTUFBbUIsQ0FBQztJQUV4QixTQUFTLGNBQWMsQ0FBQyxHQUFpQixFQUFFLElBQVM7UUFDbkQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFDLElBQUk7UUFDZixLQUFLLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFVBQ0wsTUFBYyxFQUNkLE1BQVcsRUFDWCxNQUFzQixFQUN0QixFQUE4QjtnQkFFOUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDO1NBQ0QsQ0FBQztRQUVGLEVBQUUsR0FBRyxnQkFBVSxDQUFDLElBQUksQ0FDbkIsZ0dBQWdHLENBQ2hHLENBQUM7UUFDRixNQUFNLEdBQUc7WUFDUixJQUFJLEVBQUUsb0NBQW9DO1lBQzFDLEVBQUUsRUFBRSxvQ0FBb0M7WUFDeEMsSUFBSSxFQUFFLENBQUM7WUFDUCxZQUFZLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHO1lBQ1IsU0FBUyxFQUFFLFVBQVU7WUFDckIsS0FBSyxFQUFFLENBQUM7U0FDUixDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDakIsRUFBRSxDQUFDLDZCQUE2QixFQUFFOzs7Ozt3QkFDM0IsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3ZCLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBckMsTUFBTSxHQUFHLFNBQTRCO3dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzs7OzthQUN6RCxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUU7OztnQkFDL0MsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztvQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDOzs7YUFDSCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDakIsRUFBRSxDQUFDLHNEQUFzRCxFQUFFOzs7Ozt3QkFDcEQsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzVCLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFBOzt3QkFBOUQsTUFBTSxHQUFHLFNBQXFEO3dCQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUNuQyxnQkFBZ0IsRUFDaEIsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUN6QixDQUFDO3dCQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQU8sQ0FBQyxDQUFDOzs7O2FBQzVDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpREFBaUQsRUFBRTs7O2dCQUMvQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO29CQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUNuQyxnQkFBZ0IsRUFDaEIsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUN6QixDQUFDO29CQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDOzs7YUFDSCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDcEIsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFnQixDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=