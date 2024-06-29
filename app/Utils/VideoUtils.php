<?php

namespace App\Utils;

class VideoUtils
{

    public static function checkSN($link): ?string {
        if (strpos($link, 'facebook') !== false) {
            return 'facebook';
        }
        if (strpos($link, 'youtube.com') !== false) {
            return 'youtube';
        }
        return null;
    }

    public static function getThumbnail($link){
        $thumbnail='';
        if (self::checkSN($link) == 'facebook') {
            $thumbnail=self::fb_thumb($link);
        }
        if (self::checkSN($link) == 'youtube') {
            $thumbnail=self::youtube_thumb($link);
        }
        return $thumbnail;
    }

    public static function getEmbedUrl($link){
        $embed_url='';
        if (strpos($link, 'facebook') !== false) {
            $embed_url=self::fb_embed_link($link);
        }

        if (strpos($link, 'youtube.com') !== false) {
            $embed_url=self::youtube_embed_link($link);
        }
        return $embed_url;
    }


    static function youtube_thumb($link){
        $new=str_replace('https://www.youtube.com/watch?v=','', $link);
        $vv='https://img.youtube.com/vi/'.$new.'/0.jpg';
        return $vv;
    }

    static function fb_video_id($url) {
        $main=parse_url($url);
        $main=$main['path'];
        $main=explode('/',$main);
        $main=$main[3];
        return $main;
    }

    static function fb_thumb($link) {
        $img = 'https://graph.facebook.com/'.self::fb_video_id($link).'/picture';
        return $img;
    }

    static function youtube_embed_link($link){
        $new=str_replace('https://www.youtube.com/watch?v=','', $link);
        $link='https://www.youtube.com/embed/'.$new;
        return $link;
    }

    static function fb_embed_link($link) {
        $link = 'https://www.facebook.com/plugins/video.php?href='.$link.'&show_text=0&width=560';
        return $link;
    }

}
