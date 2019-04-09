<?php
//推荐人的信息
$user_id='12306';
$user_phone='18745695479';
//对推荐人信息进行加密
$url_info='user_id='.password_hash($user_id,PASSWORD_BCRYPT).'&user_phone='.$user_phone;  //用户id bcrypt加密 不超过60位   手机号在注册页面有显示所以不加密
$url_info_base=base64_encode($url_info);
//得到的用于生成二维码的url
$url_final='register.html?'.$url_info_base;
echo $url_final;

?>