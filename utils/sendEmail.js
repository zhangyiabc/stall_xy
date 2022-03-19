var nodemailer = require("nodemailer");
// var settingConfig = require('../config/settingConfig.js');//解析参数

// var smtp = settingConfig.getValueByKey("smtp");
// var mailFrom = settingConfig.getValueByKey("mailFrom");
// var mailPwd = settingConfig.getValueByKey("mailPwd");

// function emailTo(email,subject,text,html,callback) {
//     var transporter = nodemailer.({
// host: '', //邮箱服务的主机，如smtp.qq.com
//     port: '', //对应的端口号
//     //开启安全连接
//     secure: false,
//     //secureConnection:false,
//     //用户信息
//     auth: {
//         user: '',
//         pass: ''
//     }
// })({
//         host: smtp,
//         auth: {
//             user: mailFrom,
//             pass: mailPwd //授权码,通过QQ获取  

//         }
//     });
//     var mailOptions = {
//         from: mailFrom, // 发送者  
//         to: email, // 接受者,可以同时发送多个,以逗号隔开  
//         subject: subject, // 标题  
//     };
//     if(text != undefined)
//     {
//         mailOptions.text =text;// 文本  
//     }
//     if(html != undefined)
//     {
//         mailOptions.html =html;// html  
//     }

//     var result = {
//         httpCode: 200,
//         message: '发送成功!',
//     }
//     try {
//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) {
//                 result.httpCode = 500;
//                 result.message = err;
//                 callback(result);
//                 return;
//             }
//             callback(result);
//         });
//     } catch (err) {
//         result.httpCode = 500;
//         result.message = err;
//         callback(result);
//     }

// }

/**
 * 
 * @param {*} toEmail 接收人邮箱地址
 * @param {*} subject 主题
 * @param {*} html 内容
 */
let sendEmail = (toEmail, subject, html) => {
    const transporter = nodemailer.createTransport({

        host: "smtp.qq.com", //qq smtp服务器地址
        secureConnection: false, //是否使用安全连接，对https协议的
        port: 465, //qq邮件服务所占用的端口
        auth: {
            user: "1921264695@qq.com", //开启SMTP的邮箱，有用发送邮件
            pass: "nhkygixeqostefbb" //授权码
        }
    })
    transporter.sendMail({
        from:'1921264695@qq.com',
        to:toEmail,
        subject,
        html
    },(err,info) => {
        console.log(err)
        console.log(info)
    })
}
module.exports={
    sendEmail
}