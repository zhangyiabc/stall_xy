var mailer = require('../services/sendEmail.js');
router.post("/SendEmail", function (req, res) {
    var email = req.body.email;
    var subject = "影琪通知";//标题
    var text =undefined;
    var html = "<p>你好</p><p>欢迎访问jackson影琪</p><p>点击下面链接进入访问吧：</p><p><a href='https://www.cnblogs.com/jackson-zhangjiang/'>https://www.cnblogs.com/jackson-zhangjiang/</a></p>";;
    mailer.emailTo(email, subject, text, html, function (data) {
        res.status(data.httpCode).json(data);
    })
 })