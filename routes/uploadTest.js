var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var util = require('util');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var domain = "http://localhost:3000";

/* UPLOAD listing. */
router.post('/',function(req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            var result = {
                header:{opCode:0},
                body:{
                    msg:'upload server error'
                }
            };
            res.send(result);
            return;
        }
        console.log(files);
        var extName = '';  //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            var result = {
                header:{opCode:0},
                body:{
                    msg:'只支持png和jpg格式图片'
                }
            };
            res.send(result);
            return;
        }

        var avatarName = files.fulAvatar.name.substring(0,files.fulAvatar.name.lastIndexOf('.')) + Date.now() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + avatarName;
        //显示地址；
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        console.log("newPath",newPath);
        fs.renameSync(files.fulAvatar.path, newPath);  //重命名
        var result = {
            header:{opCode:1},
            body:{
                newPath: showUrl,
                msg:'successful'
            }
        };
        res.send(result);
    });
});

module.exports = router;
