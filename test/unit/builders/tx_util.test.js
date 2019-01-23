"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var lib_1 = require("../../../lib");
var expect = chai.expect;
describe("#TxUtility", function () {
    var txUtil;
    var pk;
    var testTx;
    beforeEach(function () {
        txUtil = new lib_1.TxUtility();
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
    });
    describe(".getBytesNoHashAndSig", function () {
        it("should return expected bytes", function () {
            var buf = txUtil.getBytesNoHashAndSig(testTx);
            var expected = Buffer.from("99a131d922653468624154343551656464506a3358704a695348786239415068755148634d5557c001d93334384733434c3367477142453259686e426a5651746e514d554845424e4468774e41786f4e4c5258437256544e657a7a33436ace5c39b51ed922653468624154343551656464506a3358704a695348786239415068755148634d555701a131", "hex");
            expect(buf.equals(expected)).to.be.true;
        });
    });
    describe(".hash", function () {
        it("should return expected hash prefixed with 0x", function () {
            var hash = txUtil.hash(testTx);
            expect(hash).to.eql("0x2ff55967884145c271caea9cca0b1fd23e0aed0847eafc89e95d0956602e045b");
        });
        specify("that when prefix='', it should return expected hash without 0x prefix", function () {
            var hash = txUtil.hash(testTx, "");
            expect(hash).to.eql("2ff55967884145c271caea9cca0b1fd23e0aed0847eafc89e95d0956602e045b");
        });
    });
    describe(".sign", function () {
        it("should return expected signature prefixed with 0x", function () {
            var sig = txUtil.sign(testTx, pk);
            expect(sig).to.eq("0xa3a72abd606d03804d959cf5c6899b2e785bbf228dbc8e1943a188c8b36f69505a95323820c1261e693ac8689bfa55eb47c55b9b8b5491d9b992ed6cc1913a02");
        });
        specify("that when prefix='', it should return expected signature without 0x prefix", function () {
            var sig = txUtil.sign(testTx, pk, "");
            expect(sig).to.eq("a3a72abd606d03804d959cf5c6899b2e785bbf228dbc8e1943a188c8b36f69505a95323820c1261e693ac8689bfa55eb47c55b9b8b5491d9b992ed6cc1913a02");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfdXRpbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9idWlsZGVycy90eF91dGlsLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBOEI7QUFDOUIsb0NBQXFEO0FBQ3JELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFFM0IsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUN0QixJQUFJLE1BQWlCLENBQUM7SUFDdEIsSUFBSSxFQUFjLENBQUM7SUFDbkIsSUFBSSxNQUF5QixDQUFDO0lBRTlCLFVBQVUsQ0FBQztRQUNWLE1BQU0sR0FBRyxJQUFJLGVBQVMsRUFBRSxDQUFDO1FBQ3pCLEVBQUUsR0FBRyxnQkFBVSxDQUFDLElBQUksQ0FDbkIsZ0dBQWdHLENBQ2hHLENBQUM7UUFDRixNQUFNLEdBQUc7WUFDUixJQUFJLEVBQUUsb0NBQW9DO1lBQzFDLEVBQUUsRUFBRSxvQ0FBb0M7WUFDeEMsSUFBSSxFQUFFLENBQUM7WUFDUCxZQUFZLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHO1lBQ1IsU0FBUyxFQUFFLFVBQVU7WUFDckIsS0FBSyxFQUFFLENBQUM7U0FDUixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDakMsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQ2xDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUMzQixzUkFBc1IsRUFDdFIsS0FBSyxDQUNMLENBQUM7WUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUNsRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUNsQixvRUFBb0UsQ0FDcEUsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUNOLHVFQUF1RSxFQUN2RTtZQUNDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUNsQixrRUFBa0UsQ0FDbEUsQ0FBQztRQUNILENBQUMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUN2RCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDaEIsb0lBQW9JLENBQ3BJLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FDTiw0RUFBNEUsRUFDNUU7WUFDQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ2hCLGtJQUFrSSxDQUNsSSxDQUFDO1FBQ0gsQ0FBQyxDQUNELENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=