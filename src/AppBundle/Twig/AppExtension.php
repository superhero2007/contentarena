<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 16/1/2018
 * Time: 2:02 AM
 */

namespace AppBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function getFilters()
    {
        return array(
            new TwigFilter('price', array($this, 'priceFilter')),
            new TwigFilter('rightItem', array($this, 'rightItemFilter')),
            new TwigFilter('idSort', array($this, 'idSortFilter')),
            new TwigFilter('kebab', array($this, 'kebabFilter')),
        );
    }

    public function kebabFilter($string){
        //Lower case everything
        $string = strtolower($string);
        //Make alphanumeric (removes all other characters)
        $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
        //Clean up multiple dashes or whitespaces
        $string = preg_replace("/[\s-]+/", " ", $string);
        //Convert whitespaces and underscore to dash
        $string = preg_replace("/[\s_]/", "-", $string);
        return $string;

    }

    public function idSortFilter($item){
        usort($item, function ($item1, $item2) {
            if ($item1['id'] == $item2['id']) return 0;
            return $item1['id'] < $item2['id'] ? -1 : 1;
        });

        return $item;
    }

    public function rightItemFilter($content, $id)
    {

        $basic_input = '{{input';
        $small_input = '{{smallInput';
        $big_input = '{{bigInput';
        $datepicker_input = '{{dateInput}}';
        $calendar = '{{calendar}}';
        $language = '{{language}}';

        $basic_input_template = '<input type="text" class="right-form-input" />';
        $basic_input_placeholder_template = '<input type="text" class="right-form-input" placeholder="{{placeholder}}" />';
        $small_input_template = '<input type="text" class="right-form-input" style="width: 50px" />';
        $small_input_placeholder_template = '<input type="text" class="right-form-input" style="width: 50px"  placeholder="{{placeholder}}" />';
        $big_input_template = '<textarea></textarea>';
        $big_input_placeholder_template = '<textarea placeholder="{{placeholder}}"></textarea>';
        $datepicker_input_template = '<input class="right-form-input" type="text" class="has-datepicker" />';

        $calendar_template = '<input class="right-form-input has-calendar" type="text" id="right-item-calendar-'.$id.'" />';
        $language_template = '<select type="text" class="has-language-trigger" data-placeholder="Select language" id="right-item-select-'.$id.'" multiple ></select>';

        // Item has language selector
        if (strpos($content, $language) !== false) {
            $content = str_replace($language, $language_template, $content);
        }

        // Item has calendar
        if (strpos($content, $calendar) !== false) {
            $content = str_replace($calendar, $calendar_template, $content);
        }

        // Item has basic input
        if (strpos($content, $basic_input) !== false) {

            $placeholder = $this->get_string_between($content,"[placeholder]", "[/placeholder]");

            if ( $placeholder != '' && $placeholder != false && $placeholder != null){
                $basic_input_template = str_replace("{{placeholder}}", $placeholder, $basic_input_placeholder_template);
            }

            $content = $this->replace_all_between("{{", "}}", $content, $basic_input_template );
        }

        // Item has small input
        if (strpos($content, $small_input) !== false) {

            $placeholder = $this->get_string_between($content,"[placeholder]", "[/placeholder]");

            if ( $placeholder != '' && $placeholder != false && $placeholder != null){
                $small_input_template = str_replace("{{placeholder}}", $placeholder, $small_input_placeholder_template);
            }

            $content = $this->replace_all_between("{{", "}}", $content, $small_input_template );

        }

        // Item has date selector
        if (strpos($content, $datepicker_input) !== false) {
            $content = str_replace($datepicker_input, $datepicker_input_template, $content);
        }

        // Item has big input
        if (strpos($content, $big_input) !== false) {

            $placeholder = $this->get_string_between($content,"[placeholder]", "[/placeholder]");

            if ( $placeholder != '' && $placeholder != false && $placeholder != null){
                $big_input_template = str_replace("{{placeholder}}", $placeholder, $big_input_placeholder_template);
            }

            $content = $this->replace_all_between("{{", "}}", $content, $big_input_template );

        }


        return $content;
    }

    public function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }

    public function replace_all_between($beginning, $end, $string, $new) {
        $beginningPos = strpos($string, $beginning);
        $endPos = strpos($string, $end);
        if ($beginningPos === false || $endPos === false) {
            return $string;
        }

        $textToDelete = substr($string, $beginningPos, ($endPos + strlen($end)) - $beginningPos);

        return str_replace($textToDelete, $new, $string);
    }

    public function priceFilter($number, $decimals = 0, $decPoint = '.', $thousandsSep = ',')
    {
        $price = number_format($number, $decimals, $decPoint, $thousandsSep);
        $price = '$'.$price;

        return $price;
    }
}