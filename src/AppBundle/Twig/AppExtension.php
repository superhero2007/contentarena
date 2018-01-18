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
        );
    }

    public function idSortFilter($item){
        usort($item, function ($item1, $item2) {
            if ($item1['id'] == $item2['id']) return 0;
            return $item1['id'] < $item2['id'] ? -1 : 1;
        });

        return $item;
    }

    public function rightItemFilter($content)
    {

        $basic_input = '{{input}}';
        $basic_input_template = '<input type="text" />';

        $small_input = '{{smallInput}}';
        $small_input_template = '<input type="text" style="width: 50px" />';

        $language = '{{language}}';
        $language_template = '<select><option value="">Select language</option></select>';

        $big_input = '{{bigInput}}';
        $big_input_value = '{{bigInput}}::';
        $big_input_template = '<textarea></textarea>';
        $big_input_value_template = '<textarea>{{value}}</textarea>';

        // Item has language selector
        if (strpos($content, $language) !== false) {
            $content = str_replace($language, $language_template, $content);
        }

        // Item has basic input
        if (strpos($content, $basic_input) !== false) {
            $content = str_replace($basic_input, $basic_input_template, $content);
        }

        // Item has small input
        if (strpos($content, $small_input) !== false) {
            $content = str_replace($small_input, $small_input_template, $content);
        }

        // Item has big input with value
        if (strpos($content, $big_input_value) !== false) {

            $temp =  preg_split("/::/", $content);
            $content = str_replace("{{value}}", $temp[1], $big_input_value_template);
        }

        // Item has big input
        if (strpos($content, $big_input) !== false) {
            $content = str_replace($big_input, $big_input_template, $content);
        }


        return $content;
    }

    public function priceFilter($number, $decimals = 0, $decPoint = '.', $thousandsSep = ',')
    {
        $price = number_format($number, $decimals, $decPoint, $thousandsSep);
        $price = '$'.$price;

        return $price;
    }
}