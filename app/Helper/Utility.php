<?php
function filemtime_url($file_url)
{
    $path = parse_url($file_url);
    # remove /public/ or /
    $pattern = '~^\/public/|^\/~';
    $str = preg_replace($pattern, '', $path['path']);
    $date = 0;
    if (\File::exists($str)) {
        if (filemtime($str) != false) {
            $date = date("YmdHis", filemtime($str));
        }
    } else if (\File::exists(public_path() . '/' . $str)) {
        $date = date("YmdHis", filemtime(public_path() . '/' . $str));
    }
    return url($file_url . '?edited=') . $date;
}
function console_log($data = ' ')
{
    echo '<script> console.log(' . json_encode($data) . ')</script>';
}
