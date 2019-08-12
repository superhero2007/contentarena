<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 16/1/2018
 * Time: 2:02 AM
 */

namespace AppBundle\Twig;

use AppBundle\Entity\RightsPackage;
use AppBundle\Entity\Season;
use Psr\Container\ContainerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    /** @var ContainerInterface */
    protected $container;

    /** @param ContainerInterface $container */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getFilters()
    {
        return array(
            new TwigFilter('price', array($this, 'priceFilter')),
            new TwigFilter('has_right', array($this, 'hasRight')),
            new TwigFilter('has_not_right', array($this, 'hasNotRight')),
            new TwigFilter('percentage', array($this, 'percentage')),
            new TwigFilter('rightItem', array($this, 'rightItemFilter')),
            new TwigFilter('idSort', array($this, 'idSortFilter')),
            new TwigFilter('kebab', array($this, 'kebabFilter')),
            new TwigFilter('json_decode', array($this, 'jsonDecode')),
            new TwigFilter('right_definitions_label', array($this, 'rightDefinitionsLabel')),
            new TwigFilter('cast_to_array', array($this, 'castToArray')),
            new TwigFilter('has_content_dedicated_length', array($this, 'hasContentDedicatedLength')),
            new TwigFilter('content_delivery_label', array($this, 'contentDeliveryLabel')),
            new TwigFilter('has_dedicated_highlights', array($this, 'hasDedicatedHighlights')),
            new TwigFilter('get_custom_live', array($this, 'getCustomLive')),
            new TwigFilter('season_duration', array($this, 'seasonDuration'))


        );
    }

    public function seasonDuration($season) {
        /* @var Season $season */

        if ($season->getStartDate() == null || $season->getEndDate() == null ) return $season->getName();

        $startMonth = $season->getStartDate()->format("M");
        $endMonth = $season->getEndDate()->format("M");
        $startYear = $season->getStartDate()->format("Y");
        $endYear = $season->getEndDate()->format("Y");

        if ( $startYear == $endYear ) return $startYear;

        return $startYear."/".substr($endYear,-2). " (".$startMonth. " " . $startYear. " - ". $endMonth ." " . $endYear .  ")";

    }

    public function jsonDecode($str) {
        return json_decode($str);
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

    public function contentDeliveryLabel($shortTag){
        switch ($shortTag){
            case "LT" : return "Live Feed";
            case "DT" : return "Delayed & Archive Content";
            case "LB" : return "Live Betting Feed";
            case "HL" : return "Highlight & Clip Footage";
            case "NA" : return "News Access";
            case "PR" : return "Edited Program";
        }
        return "";
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

    public function castToArray($stdClassObject) {
        $response = array();
        foreach ($stdClassObject as $key => $value) {
            $response[] = array($key, $value);
        }
        return $response;
    }

    public function hasRight($rights, $shortLabel){
        $has = false;
        foreach ($rights as $right){
            /* @var RightsPackage $right*/
            if ( $right->getShortLabel() == $shortLabel ) $has = true;
        }

        return $has;
    }

    public function hasNotRight($rights, $shortLabel){
        return !$this->hasRight($rights, $shortLabel);
    }

    public function hasDedicatedHighlights($selectedRights,$rights){
        $has = false;
        foreach ($rights as $key => $right){
            /* @var RightsPackage $right*/
            if ( $right->getShortLabel() == "HL" && $selectedRights[$right->getId()]['items']["CONTENT_DELIVERY"] === 'CONTENT_DELIVERY_DEDICATED' ) $has = true;
        }

        return $has;
    }

    public function getProductionDetailsColumns($selectedRights,$rights){
        $has = false;
        foreach ($rights as $key => $right){
            /* @var RightsPackage $right*/
            if ( $right->getShortLabel() == "HL" && $selectedRights[$right->getId()]['items']["CONTENT_DELIVERY"] === 'CONTENT_DELIVERY_DEDICATED' ) $has = true;
        }

        return $has;
    }


    public function getCustomLive($selectedRights,$rights){
        $custom = null;

        if ( $this->hasRight($rights, "LT") ) return null;

        foreach ($rights as $key => $right){
            /* @var RightsPackage $right*/
            if ( $selectedRights[$right->getId()]['items']["CONTENT_DELIVERY"] === 'CONTENT_DELIVERY_LIVE' ) {
                $custom = $right;
                break;
            }
        }

        return $custom;
    }

    public function hasContentDedicatedLength($rights){
        $length = 0;
        foreach ($rights as $right){
            /* @var RightsPackage $right*/
            if ( $right['items']["CONTENT_DELIVERY"] !== 'CONTENT_DELIVERY_LIVE' ) $length+=1;
        }

        return $length;
    }

    public function percentage($total, $percentage){
        $result = ($percentage / 100) * $total;

        return $result;

    }

    public function rightDefinitionsLabel ($right){
        $definitions = array(
            "EXPLOITATION_FORM_ALL" => "All",
            "EXPLOITATION_FORM_FREE" => "Free Only",
            "EXPLOITATION_FORM_PAY" => "Pay Only",
            "EXPLOITATION_FORM_IN-SHIP" => "In-Ship & In-Flight",
            "EXPLOITATION_FORM_CLOSED" => "Closed Circuit",
            "TRANSMISSION_MEANS_ALL" => "All",
            "TRANSMISSION_MEANS_CABLE" => "Cable & IPTV",
            "TRANSMISSION_MEANS_SATELLITE" => "Satellite",
            "TRANSMISSION_MEANS_DIGITAL" => "Digital Terrestrial",
            "TRANSMISSION_MEANS_OTT" => "OTT",
            "TRANSMISSION_MEANS_INTERNET" => "Internet",
            "TRANSMISSION_MEANS_MOBILE" => "Mobile",
            "EXPLOITATION_WINDOW_UNLIMITED" => "Unlimited",
            "EXPLOITATION_WINDOW_LIMITED" => "Limited",
            "RESERVED_RIGHTS_NO" => "No",
            "RESERVED_RIGHTS_YES" => "Yes",
            "SUBLICENSE_YES" => "Yes",
            "SUBLICENSE_YES_APPROVAL" => "Yes, but remains subject to seller's approval",
            "SUBLICENSE_NO" => "No",
            "RUNS_UNLIMITED" => "Unlimited",
            "RUNS_LIMITED" => "Limited",
            "GRAPHICS_NO" => "No",
            "GRAPHICS_YES" => "Yes",
            "GRAPHICS_NOT_AVAILABLE" => "Info not available yet",
            "COMMENTARY_NO" => "No",
            "COMMENTARY_YES" => "Yes",
            "COMMENTARY_NOT_AVAILABLE" => "Info not available yet",
            "CAMERA_MINIMUM" => "Minimum cameras",
            "CAMERA_TEXT" => "",
            "CAMERA_NOT_AVAILABLE" => "Info not available yet",
            "CONTENT_ALL" => "All content produced",
            "CONTENT_TEXT" => "Content partially produced",
            "TECHNICAL_DELIVERY_SATELLITE" => "Satellite",
            "TECHNICAL_DELIVERY_IP" => "IP",
            "TECHNICAL_DELIVERY_FTP" => "FTP-server",
            "TECHNICAL_DELIVERY_FIBER" => "Fiber",
            "CONTENT_DELIVERY_LIVE" => "Delivered via live feed",
            "CONTENT_DELIVERY_DEDICATED" => "Dedicated content delivery",
            "CONTENT_DELIVERY_NON_DEDICATED" => "No dedicated content delivery",
            "VIDEO_STANDARD_HD" => "HD",
            "VIDEO_STANDARD_SD" => "SD",
            "VIDEO_STANDARD_UHD" => "UHD",
            "VIDEO_STANDARD_VR" => "VR",
            "VIDEO_STANDARD_NOT_AVAILABLE" => "Info not available yet",
            "ASPECT_RATIO_16_9" => "16:9",
            "ASPECT_RATIO_4_3" => "4:3",
            "ASPECT_RATIO_CUSTOM" => "Other",
            "ASPECT_RATIO_NOT_AVAILABLE" => "Info not available yet"
        );

        if (isset($definitions[$right])) return $definitions[$right];

        return "";

    }

}
