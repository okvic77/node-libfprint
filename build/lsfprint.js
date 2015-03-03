#!/usr/bin/env node
// This script lists the available fingerprint readers on the system.
/// <reference path="../typings/tsd.d.ts"/>
var libfprint = require("../");
var sprintf = require("sprintf-js").sprintf;
var verbose = false;
if (process.argv.length > 2) {
    if (process.argv[2] == "-v") {
        verbose = true;
    }
    else {
        console.log("usage: lsfprint [-v]");
        process.exit(0);
    }
}
var fp = new libfprint.fprint();
console.log(sprintf("%8s %-8s %-8s %-32s", "handle", "type", "driver", "description"));
fp.init();
fp.discover().forEach(function (entry) {
    console.log(sprintf("%8d %-8s %-8s %-32s", entry.handle, entry.driver_type, entry.driver, entry.driver_detail));
    if (verbose) {
        var reader = fp.get_reader(entry.handle);
        console.log(sprintf("\t Enroll stages: %d", reader.enroll_stages));
        console.log(sprintf("\t Supports imaging: %s", reader.supports_imaging));
        console.log(sprintf("\t Supports identification: %s", reader.supports_identification));
        console.log(sprintf("\t Image height: %d", reader.img_height));
        console.log(sprintf("\t Image width: %d", reader.img_width));
        reader.close();
    }
});
fp.exit();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZnByaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFFQUFxRTtBQUVyRSxBQUVBLDJDQUYyQztJQUV2QyxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFNUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUM1QixDQUFDO0lBQ0csRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FDNUIsQ0FBQztRQUNHLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNELElBQUksQ0FDSixDQUFDO1FBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztBQUNMLENBQUM7QUFFRCxJQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBRXZGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNWLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLO0lBRXpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRWpILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNaLENBQUM7UUFDRyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUNYLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiJsc2ZwcmludC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hZXJvL25vZGUtbGliZnByaW50LyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgc2NyaXB0IGxpc3RzIHRoZSBhdmFpbGFibGUgZmluZ2VycHJpbnQgcmVhZGVycyBvbiB0aGUgc3lzdGVtLlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiLz5cblxudmFyIGxpYmZwcmludCA9IHJlcXVpcmUoXCIuLi9cIik7XG52YXIgc3ByaW50ZiA9IHJlcXVpcmUoXCJzcHJpbnRmLWpzXCIpLnNwcmludGY7XG5cbnZhciB2ZXJib3NlID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIpXG57XG4gICAgaWYgKHByb2Nlc3MuYXJndlsyXSA9PSBcIi12XCIpXG4gICAge1xuICAgICAgICB2ZXJib3NlID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2FnZTogbHNmcHJpbnQgWy12XVwiKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbn1cblxudmFyIGZwID0gbmV3IGxpYmZwcmludC5mcHJpbnQoKTtcbmNvbnNvbGUubG9nKHNwcmludGYoXCIlOHMgJS04cyAlLThzICUtMzJzXCIsIFwiaGFuZGxlXCIsIFwidHlwZVwiLCBcImRyaXZlclwiLCBcImRlc2NyaXB0aW9uXCIpKTtcblxuZnAuaW5pdCgpO1xuZnAuZGlzY292ZXIoKS5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3ByaW50ZihcIiU4ZCAlLThzICUtOHMgJS0zMnNcIiwgZW50cnkuaGFuZGxlLCBlbnRyeS5kcml2ZXJfdHlwZSwgIGVudHJ5LmRyaXZlciwgZW50cnkuZHJpdmVyX2RldGFpbCkpO1xuXG4gICAgICAgICAgICBpZiAodmVyYm9zZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gZnAuZ2V0X3JlYWRlcihlbnRyeS5oYW5kbGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNwcmludGYoXCJcXHQgRW5yb2xsIHN0YWdlczogJWRcIiwgcmVhZGVyLmVucm9sbF9zdGFnZXMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcHJpbnRmKFwiXFx0IFN1cHBvcnRzIGltYWdpbmc6ICVzXCIsIHJlYWRlci5zdXBwb3J0c19pbWFnaW5nKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3ByaW50ZihcIlxcdCBTdXBwb3J0cyBpZGVudGlmaWNhdGlvbjogJXNcIiwgcmVhZGVyLnN1cHBvcnRzX2lkZW50aWZpY2F0aW9uKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3ByaW50ZihcIlxcdCBJbWFnZSBoZWlnaHQ6ICVkXCIsIHJlYWRlci5pbWdfaGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3ByaW50ZihcIlxcdCBJbWFnZSB3aWR0aDogJWRcIiwgcmVhZGVyLmltZ193aWR0aCkpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbmZwLmV4aXQoKTtcbiJdfQ==