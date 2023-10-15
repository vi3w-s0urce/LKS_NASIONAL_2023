<?php 
$image = 'image.jpg';
$logo = 'logo.png';

$image = imagecreatefromjpeg($image);

$logo = imagecreatefrompng($logo);

$lebar_image = imagesx($image);
$tinggi_image = imagesy($image);

$lebar_logo = imagesx($logo);
$tinggi_logo = imagesy($logo);

$posisi_x = $lebar_image - $lebar_logo;
$posisi_y = 0;

imagecopy($image, $logo, $posisi_x, $posisi_y, 0, 0, $lebar_logo, $tinggi_logo);

header('Content-Type: image/jpeg');

imagepng($image);
?>