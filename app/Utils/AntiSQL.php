<?php

namespace App\Utils;

class AntiSQL
{
    static function filter($field)
    {
        $field = $field;
        $field = strip_tags($field);
        $field = preg_replace("(\#|\*|;|=)", "", $field);
        $field = str_replace("from", "", $field);
        $field = str_replace("select", "", $field);
        $field = str_replace("delete", "", $field);
        $field = str_replace("drop", "", $field);
        $field = str_replace("insert", "", $field);
        $field = str_replace("update", "", $field);

        return trim($field);
    }

    static function filterAll($requestAll)
    {

        $requestAllFiltered = array();
        foreach($requestAll as $key => $itemRequestValue) {
            $requestAllFiltered[$key] = self::filter($itemRequestValue);
        }

        return $requestAllFiltered;

    }

}
