/// <reference path="../typings/tsd.d.ts"/>

var binary = require('node-pre-gyp');
var path = require('path');
var PACKAGE_JSON = path.join(__dirname, '../package.json');
var binding_path = binary.find(path.resolve(PACKAGE_JSON));
var fprintbinding = require(binding_path);

var stream = require('stream');
var util = require('util');
var bunyan = require('bunyan');
var events = require('events');

var log;

export enum fp_enroll_result
{
    ENROLL_COMPLETE = 1,
    ENROLL_FAIL = 2,
    ENROLL_PASS = 3,
    ENROLL_RETRY = 100,
    ENROLL_RETRY_TOO_SHORT = 101,
    ENROLL_RETRY_CENTER_FINGER = 102,
    ENROLL_RETRY_REMOVE_FINGER = 103,
    ENROLL_CANCELLED = 200 // custom, for async
}

export enum fp_verify_result
{ 
    VERIFY_NO_MATCH = 0, 
    VERIFY_MATCH = 1, 
    VERIFY_RETRY = 100, 
    VERIFY_RETRY_TOO_SHORT = 101, 
    VERIFY_RETRY_CENTER_FINGER = 102, 
    VERIFY_RETRY_REMOVE_FINGER = 103,
    VERIFY_CANCELLED = 200 // custom, for async
}

export enum fp_stop_result
{
    STOP_SUCCESS = 1,
    STOP_FAIL = 2,
    STOP_IGNORE = 3
}

export class fpreader {
    private wrapped;

    enroll_stages : number;
    supports_imaging : boolean;
    supports_identification: boolean;
    img_width: number;
    img_height: number;

    close = () => {
        this.wrapped.close();
    }

    // update the database
    update_database = (fplist: string[]) : void => {
        this.wrapped.update_database(fplist);
    }

    // Start enrolling a fingerprint
    start_enroll = (callback : (err, result : fp_enroll_result, fpdata : Buffer, fpimage: Buffer, height : Number, width : Number) => void) : void => {
    
        // tell the fpreader to begin the enroll finger process
        if (!this.wrapped.enroll_finger(
                // Enroll finger has completed
                function (result: fp_enroll_result, fpdata, fpimage, height : number, width: number)
                {
                    var err = null;

                    // If the result was not a successful enrollment
                    if (result != fp_enroll_result.ENROLL_COMPLETE)
                    {
                        // store error code in err
                        err = fp_enroll_result[result];
                        callback(err,null, null, null, null, null);
                    }
                    else 
                    {
                        // check the fpdata for completeness
                        if (fpdata !== null && fpdata !== undefined)
                        {
                            //var data = new Buffer(fpdata.toString('utf8'),'base64');
                            //fpdata.copy(data);
                        }

                        // shouldn't we check these as well? TODO
                        var image = new Buffer(fpimage.length);
                        fpimage.copy(image);

                        // callback to fp_server
                        callback(err, result, fpdata, image, height, width);
                    }
                }
        )) {
            // Not finished yet!
            callback("Enroll in progress!", null, null, null, null, null);
        }
    }

    // Stop enrolling a fingerprint
    stop_enroll = (callback : (err,result) => void) : void => {
        // tell the fp.reader to stop enrollment (if it is enrolling)
        this.wrapped.stop_enroll_finger(
            function (result: fp_stop_result)
            {
                var err = null;
                if (result == fp_stop_result.STOP_SUCCESS) {
                    callback(err, true);
                } else {
                    err = fp_stop_result[result];
                    callback(err, null);
                }
            }
        );
    }

    // ******TODO figure out how to pass an argument down here

    // Start identifying a fingerprint
    start_identify = (callback : (err, result : fp_verify_result, fpindex : Number, fpimage: Buffer, height : Number, width : Number) => void) : void => {
    
        // tell the fpreader to begin the identify finger process
        if (!this.wrapped.identify_finger( // ***** TODO pass in the list arg
                // Identify finger has completed
                function (result: fp_verify_result, fpindex, fpimage, height : number, width: number)
                {
                    var err = null;

                    // If the result was not successful
                    if (result != fp_verify_result.VERIFY_MATCH)
                    {
                        // store error code in err
                        err = fp_verify_result[result];
                        callback(err,null, null, null, null, null);
                    }
                    else 
                    {
                        // shouldn't we check these as well? TODO
                        var image = new Buffer(fpimage.length);
                        fpimage.copy(image);

                        // callback to fp_server
                        callback(err, result, fpindex, image, height, width);
                    }
                }
        )) {
            // Not finished yet!
            callback("Identify in progress!", null, null, null, null, null);
        }
    }

    // Stop identifying a fingerprint
    stop_identify = (callback : (err,result) => void) : void => {
        // tell the fp.reader to stop identification (if it is identifying)
        this.wrapped.stop_identify_finger(
            function (result: fp_stop_result)
            {
                var err = null;
                if (result == fp_stop_result.STOP_SUCCESS) {
                    callback(err, true);
                } else {
                    err = fp_stop_result[result];
                    callback(err, null);
                }
            }
        );
    }

    // Driver for async fingerprint activity
    handle_events = () : void => {
        // tell the fp.reader to handle events, i.e. advance the reader a step
        this.wrapped.handle_events();
    }

    constructor(fpinstance) {
        this.wrapped = fpinstance;

        //these values are static so we can grab them now
        this.enroll_stages = fpinstance.enroll_stages;
        this.supports_imaging = fpinstance.supports_imaging;
        this.supports_identification = fpinstance.supports_identification;
        this.img_width = fpinstance.img_width;
        this.img_height = fpinstance.img_height;
    }
}

export class fprint {

    // Initializes libfprint and returns 0 if successful.
    init() : number  {
        return fprintbinding.init();
    }

    discover() {
        var devices = [];
        fprintbinding.discover( function(handle, devid, drvtype, drvname, drvfullname)
                {
                    var thisdev = {
                        handle: handle,
                        deviceid: devid,
                        driver_type: drvtype,
                        driver: drvname,
                        driver_detail: drvfullname
                    };

                    devices.push(thisdev);
                });

        return devices;
    }

    get_reader(handle: number) {
        var reader = new fprintbinding.fpreader(handle);
        if (typeof reader != 'undefined')
        {
            return new fpreader(reader);
        }
        return null;
    }

    exit() : void {
        return fprintbinding.exit();
    }

    constructor () { }
}
