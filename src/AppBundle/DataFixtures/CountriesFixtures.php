<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\Country;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use AppBundle\DataFixtures\TerritoryFixtures;

class CountriesFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $test = json_decode('[
  {
    "name": "Algeria",
    "country_code": "DZA",
    "region": "Africa",
    "region_code": 2
  },
  
  {
    "name": "Kosovo",
    "country_code": "XKX",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Angola",
    "country_code": "AGO",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Benin",
    "country_code": "BEN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Botswana",
    "country_code": "BWA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Burkina Faso",
    "country_code": "BFA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Burundi",
    "country_code": "BDI",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Cameroon",
    "country_code": "CMR",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Cabo Verde",
    "country_code": "CPV",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Central African Republic",
    "country_code": "CAF",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Chad",
    "country_code": "TCD",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Comoros",
    "country_code": "COM",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Congo",
    "country_code": "COG",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Congo (Democratic Republic of the)",
    "country_code": "COD",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Côte d\'Ivoire",
    "country_code": "CIV",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Djibouti",
    "country_code": "DJI",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Egypt",
    "country_code": "EGY",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Equatorial Guinea",
    "country_code": "GNQ",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Eritrea",
    "country_code": "ERI",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Ethiopia",
    "country_code": "ETH",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Gabon",
    "country_code": "GAB",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Gambia",
    "country_code": "GMB",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Ghana",
    "country_code": "GHA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Guinea",
    "country_code": "GIN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Guinea-Bissau",
    "country_code": "GNB",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Kenya",
    "country_code": "KEN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Lesotho",
    "country_code": "LSO",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Liberia",
    "country_code": "LBR",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Libya",
    "country_code": "LBY",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Madagascar",
    "country_code": "MDG",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Malawi",
    "country_code": "MWI",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Mali",
    "country_code": "MLI",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Mauritania",
    "country_code": "MRT",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Mauritius",
    "country_code": "MUS",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Mayotte",
    "country_code": "MYT",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Morocco",
    "country_code": "MAR",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Mozambique",
    "country_code": "MOZ",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Namibia",
    "country_code": "NAM",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Niger",
    "country_code": "NER",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Nigeria",
    "country_code": "NGA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Réunion",
    "country_code": "REU",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Rwanda",
    "country_code": "RWA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "country_code": "SHN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Sao Tome and Principe",
    "country_code": "STP",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Senegal",
    "country_code": "SEN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Seychelles",
    "country_code": "SYC",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Sierra Leone",
    "country_code": "SLE",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Somalia",
    "country_code": "SOM",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "South Africa",
    "country_code": "ZAF",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "South Sudan",
    "country_code": "SSD",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Sudan",
    "country_code": "SDN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Swaziland",
    "country_code": "SWZ",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Tanzania, United Republic of",
    "country_code": "TZA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Togo",
    "country_code": "TGO",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Tunisia",
    "country_code": "TUN",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Uganda",
    "country_code": "UGA",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Western Sahara",
    "country_code": "ESH",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Zambia",
    "country_code": "ZMB",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "Zimbabwe",
    "country_code": "ZWE",
    "region": "Africa",
    "region_code": 2
  },
  {
    "name": "American Samoa",
    "country_code": "ASM",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Australia",
    "country_code": "AUS",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Cook Islands",
    "country_code": "COK",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Fiji",
    "country_code": "FJI",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "French Polynesia",
    "country_code": "PYF",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Guam",
    "country_code": "GUM",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Kiribati",
    "country_code": "KIR",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Marshall Islands",
    "country_code": "MHL",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Micronesia (Federated States of)",
    "country_code": "FSM",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Nauru",
    "country_code": "NRU",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "New Caledonia",
    "country_code": "NCL",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "New Zealand",
    "country_code": "NZL",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Niue",
    "country_code": "NIU",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Norfolk Island",
    "country_code": "NFK",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Northern Mariana Islands",
    "country_code": "MNP",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Palau",
    "country_code": "PLW",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Papua New Guinea",
    "country_code": "PNG",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Pitcairn",
    "country_code": "PCN",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Samoa",
    "country_code": "WSM",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Solomon Islands",
    "country_code": "SLB",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Tokelau",
    "country_code": "TKL",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Tonga",
    "country_code": "TON",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Tuvalu",
    "country_code": "TUV",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Vanuatu",
    "country_code": "VUT",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Wallis and Futuna",
    "country_code": "WLF",
    "region": "Oceania",
    "region_code": 9
  },
  {
    "name": "Anguilla",
    "country_code": "AIA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Antigua and Barbuda",
    "country_code": "ATG",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Argentina",
    "country_code": "ARG",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Aruba",
    "country_code": "ABW",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Bahamas",
    "country_code": "BHS",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Barbados",
    "country_code": "BRB",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Belize",
    "country_code": "BLZ",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Bermuda",
    "country_code": "BMU",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Bolivia (Plurinational State of)",
    "country_code": "BOL",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Bonaire, Sint Eustatius and Saba",
    "country_code": "BES",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Brazil",
    "country_code": "BRA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Canada",
    "country_code": "CAN",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Cayman Islands",
    "country_code": "CYM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Chile",
    "country_code": "CHL",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Colombia",
    "country_code": "COL",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Costa Rica",
    "country_code": "CRI",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Cuba",
    "country_code": "CUB",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Curaçao",
    "country_code": "CUW",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Dominica",
    "country_code": "DMA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Dominican Republic",
    "country_code": "DOM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Ecuador",
    "country_code": "ECU",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "El Salvador",
    "country_code": "SLV",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Falkland Islands (Malvinas)",
    "country_code": "FLK",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "French Guiana",
    "country_code": "GUF",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Greenland",
    "country_code": "GRL",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Grenada",
    "country_code": "GRD",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Guadeloupe",
    "country_code": "GLP",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Guatemala",
    "country_code": "GTM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Guyana",
    "country_code": "GUY",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Haiti",
    "country_code": "HTI",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Honduras",
    "country_code": "HND",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Jamaica",
    "country_code": "JAM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Martinique",
    "country_code": "MTQ",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Mexico",
    "country_code": "MEX",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Montserrat",
    "country_code": "MSR",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Nicaragua",
    "country_code": "NIC",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Panama",
    "country_code": "PAN",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Paraguay",
    "country_code": "PRY",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Peru",
    "country_code": "PER",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Puerto Rico",
    "country_code": "PRI",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Barthélemy",
    "country_code": "BLM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Kitts and Nevis",
    "country_code": "KNA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Lucia",
    "country_code": "LCA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Martin (French part)",
    "country_code": "MAF",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Pierre and Miquelon",
    "country_code": "SPM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "country_code": "VCT",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Sint Maarten (Dutch part)",
    "country_code": "SXM",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Suriname",
    "country_code": "SUR",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Trinidad and Tobago",
    "country_code": "TTO",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Turks and Caicos Islands",
    "country_code": "TCA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "United States of America",
    "country_code": "USA",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Uruguay",
    "country_code": "URY",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Venezuela (Bolivarian Republic of)",
    "country_code": "VEN",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Virgin Islands (British)",
    "country_code": "VGB",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Virgin Islands (U.S.)",
    "country_code": "VIR",
    "region": "Americas",
    "region_code": 19
  },
  {
    "name": "Afghanistan",
    "country_code": "AFG",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Armenia",
    "country_code": "ARM",
    "region": "Asia",
    "region_code": 150
  },
  {
    "name": "Azerbaijan",
    "country_code": "AZE",
    "region": "Asia",
    "region_code": 150
  },
  {
    "name": "Bahrain",
    "country_code": "BHR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Bangladesh",
    "country_code": "BGD",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Bhutan",
    "country_code": "BTN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Brunei Darussalam",
    "country_code": "BRN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Cambodia",
    "country_code": "KHM",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "China",
    "country_code": "CHN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Cyprus",
    "country_code": "CYP",
    "region": "Asia",
    "region_code": 150
  },
  {
    "name": "Georgia",
    "country_code": "GEO",
    "region": "Asia",
    "region_code": 150
  },
  {
    "name": "Hong Kong",
    "country_code": "HKG",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "India",
    "country_code": "IND",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Indonesia",
    "country_code": "IDN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Iran (Islamic Republic of)",
    "country_code": "IRN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Iraq",
    "country_code": "IRQ",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Israel",
    "country_code": "ISR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Japan",
    "country_code": "JPN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Jordan",
    "country_code": "JOR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Kazakhstan",
    "country_code": "KAZ",
    "region": "Asia",
    "region_code": 150
  },
  {
    "name": "Korea (Democratic People\'s Republic of)",
    "country_code": "PRK",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Korea (Republic of)",
    "country_code": "KOR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Kuwait",
    "country_code": "KWT",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Kyrgyzstan",
    "country_code": "KGZ",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Lao People\'s Democratic Republic",
    "country_code": "LAO",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Lebanon",
    "country_code": "LBN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Macao",
    "country_code": "MAC",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Malaysia",
    "country_code": "MYS",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Maldives",
    "country_code": "MDV",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Mongolia",
    "country_code": "MNG",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Myanmar",
    "country_code": "MMR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Nepal",
    "country_code": "NPL",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Oman",
    "country_code": "OMN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Pakistan",
    "country_code": "PAK",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Palestine, State of",
    "country_code": "PSE",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Philippines",
    "country_code": "PHL",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Qatar",
    "country_code": "QAT",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Saudi Arabia",
    "country_code": "SAU",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Singapore",
    "country_code": "SGP",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Sri Lanka",
    "country_code": "LKA",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Syrian Arab Republic",
    "country_code": "SYR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Taiwan, Province of China",
    "country_code": "TWN",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Tajikistan",
    "country_code": "TJK",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Thailand",
    "country_code": "THA",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Timor-Leste",
    "country_code": "TLS",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Turkey",
    "country_code": "TUR",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Turkmenistan",
    "country_code": "TKM",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "United Arab Emirates",
    "country_code": "ARE",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Uzbekistan",
    "country_code": "UZB",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Viet Nam",
    "country_code": "VNM",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Yemen",
    "country_code": "YEM",
    "region": "Asia",
    "region_code": 142
  },
  {
    "name": "Åland Islands",
    "country_code": "ALA",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Albania",
    "country_code": "ALB",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Andorra",
    "country_code": "AND",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Austria",
    "country_code": "AUT",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Belarus",
    "country_code": "BLR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Belgium",
    "country_code": "BEL",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Bosnia and Herzegovina",
    "country_code": "BIH",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Bulgaria",
    "country_code": "BGR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Croatia",
    "country_code": "HRV",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Czech Republic",
    "country_code": "CZE",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Denmark",
    "country_code": "DNK",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Estonia",
    "country_code": "EST",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Faroe Islands",
    "country_code": "FRO",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Finland",
    "country_code": "FIN",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "France",
    "country_code": "FRA",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Germany",
    "country_code": "DEU",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Gibraltar",
    "country_code": "GIB",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Greece",
    "country_code": "GRC",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Guernsey",
    "country_code": "GGY",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Holy See",
    "country_code": "VAT",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Hungary",
    "country_code": "HUN",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Iceland",
    "country_code": "ISL",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Ireland",
    "country_code": "IRL",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Isle of Man",
    "country_code": "IMN",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Italy",
    "country_code": "ITA",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Jersey",
    "country_code": "JEY",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Latvia",
    "country_code": "LVA",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Liechtenstein",
    "country_code": "LIE",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Lithuania",
    "country_code": "LTU",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Luxembourg",
    "country_code": "LUX",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Macedonia (the former Yugoslav Republic of)",
    "country_code": "MKD",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Malta",
    "country_code": "MLT",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Moldova (Republic of)",
    "country_code": "MDA",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Monaco",
    "country_code": "MCO",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Montenegro",
    "country_code": "MNE",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Netherlands",
    "country_code": "NLD",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Norway",
    "country_code": "NOR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Poland",
    "country_code": "POL",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Portugal",
    "country_code": "PRT",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Romania",
    "country_code": "ROU",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Russian Federation",
    "country_code": "RUS",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "San Marino",
    "country_code": "SMR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Serbia",
    "country_code": "SRB",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Slovakia",
    "country_code": "SVK",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Slovenia",
    "country_code": "SVN",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Spain",
    "country_code": "ESP",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Svalbard and Jan Mayen",
    "country_code": "SJM",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Sweden",
    "country_code": "SWE",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Switzerland",
    "country_code": "CHE",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Ukraine",
    "country_code": "UKR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "United Kingdom of Great Britain and Northern Ireland",
    "country_code": "GBR",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "England",
    "country_code": "ENG",
    "region": "Europe",
    "region_code": 150
  },
  {
    "name": "Antarctica",
    "country_code": "ATA",
    "region": "",
    "region_code": ""
  },
  {
    "name": "Bouvet Island",
    "country_code": "BVT",
    "region": "",
    "region_code": "" 
  },
  {
    "name": "British Indian Ocean Territory",
    "country_code": "IOT",
    "region": "",
    "region_code": ""
  },
  {
    "name": "Christmas Island",
    "country_code": "CXR",
    "region": "",
    "region_code": ""
  },
  {
    "name": "Cocos (Keeling) Islands",
    "country_code": "CCK",
    "region": "",
    "region_code": ""
  },
  {
    "name": "French Southern Territories",
    "country_code": "ATF",
    "region": "",
    "region_code": ""
  },
  {
    "name": "Heard Island and McDonald Islands",
    "country_code": "HMD",
    "region": "",
    "region_code": ""
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "country_code": "SGS",
    "region": "",
    "region_code": ""
  },
  {
    "name": "United States Minor Outlying Islands",
    "country_code": "UMI",
    "region": "",
    "region_code": ""
  }
]');

        $countriesToAdd = array(
            array("Wake Island", "WAK", "Oceania"),
            array("Clipperton Island", "PYF", "Americas"),
            array("Eswatini", "SWZ", "Africa"),
            array("South Georgia and the South Sandwich Islands", "SGS", "Americas")
        );
        $countriesToUpdate = array(
            array("Turkey", "TUR", "Europe")

        );
        $countriesToRemove = array(
            "Faroe Islands",
            "Gibraltar",
            "Swaziland",
            "Guernsey",
            "Holly See",
            "French Polynesia",
            "Isle of Man",
            "Jersey",
            "Svalbard and Jan Mayen",
            "Åland Islands",
            "Hong Kong",
            "Macao",
            "Mayotte",
            "Western Sahara"

        );

        foreach ($countriesToRemove as $item){
            $country = $manager->getRepository("AppBundle:Country")->findOneBy( array('name' => $item ));

            if ( $country != null ){
                $manager->remove($country);
            }
        }

        $manager->flush();

        foreach ($countriesToAdd as $item){
            $country = $manager->getRepository("AppBundle:Country")->findOneBy( array('name' => $item[0] ));

            if ( $country == null ){

                $territory = $manager->getRepository("AppBundle:Territory")
                    ->findOneBy( array('name' => $item[2] ));

                if ( $territory != null ){
                    $country = new Country();
                    $country->setName($item[0]);
                    $country->setCountryCode($item[1]);
                    $country->setTerritory($territory);
                    $manager->persist($country);
                }
            }
        }

        $manager->flush();

        foreach ($countriesToUpdate as $item){
            $country = $manager->getRepository("AppBundle:Country")->findOneBy( array('name' => $item[0] ));

            if ( $country != null ){

                $territory = $manager->getRepository("AppBundle:Territory")
                    ->findOneBy( array('name' => $item[2] ));

                if ( $territory != null ){
                    $country->setName($item[0]);
                    $country->setCountryCode($item[1]);
                    $country->setTerritory($territory);
                    $manager->persist($country);
                }
            }
        }


        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            TerritoryFixtures::class
        );
    }

}