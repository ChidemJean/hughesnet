<?php

namespace App\Utils;

class DateUtils {
    const months = [
        '01' => 'Jan',
        '02' => 'Fev',
        '03' => 'Mar',
        '04' => 'Abr',
        '05' => 'Mai',
        '06' => 'Jun',
        '07' => 'Jul',
        '08' => 'Ago',
        '09' => 'Set',
        '10' => 'Out',
        '11' => 'Nov',
        '12' => 'Dez',
     ];
    public static function getElapsedTime($datePublished): string
    {
        $diff = (new \DateTime())->diff((new \DateTime($datePublished)));
        $days = $diff->days;
        if ($days == 0) {
            return "hoje";
        }
        if ($days < date("t")) {
            return "há " . $days . " " . ($days > 1 ? "dias" : "dia");
        }
        $months = $diff->format('%m');
        if ($months < 12) {
            return "há " . $months . " " . ($months > 1 ? "meses" : "mês");
        }
        $years = $diff->format('%y');
        return "há " . $years . " " . ($years > 1 ? "anos" : "ano");
    }

    public static function getReadTime($content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $readingSpeed = 200;
        $averageTime = ceil($wordCount / $readingSpeed);
        $hours = floor($averageTime / 60);
        $minutes = $averageTime % 60;
        $time = '';
        if ($hours > 0) {
            $time .= $hours . ($hours > 1 ? ' horas ' : ' hora ');
        }
        if ($minutes > 0) {
            $time .= $minutes . ($minutes > 1 ? ' min ' : ' min ');
        }
        return $time;
    }

    public static function getFormatedDate($datePublished) {
        $dateObj = new \DateTime($datePublished);
        return ((int)$dateObj->format('d')).' de '.self::months[$dateObj->format('m')].' de '.$dateObj->format('Y');
    }

}
