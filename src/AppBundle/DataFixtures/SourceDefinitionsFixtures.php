<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\BidType;
use AppBundle\Entity\Currency;
use AppBundle\Entity\SourceDefinitions;
use AppBundle\Entity\SourceLicenseTerm;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class SourceDefinitionsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array('1', true, 'Live Transmission Rights', 'means the right to a real-time (subject to latency) Transmission of the Program other than in betting shops and on betting platforms'),
            array('2', true, 'Delayed Transmission Rights', 'means the right to a full-length delayed Transmission of the Program commencing not before the end of the respective Single Event;'),
            array('3', true, 'Live Betting Rights', 'means the right to real-time (subject to latency) Transmission of the Program in betting shops and on betting platforms;'),
            array('4', true, 'Highlight & Clip Rights', 'means the right to a Transmission of non-live footage of the Program in a length specified in the Rights Specification;'),
            array('5', true, 'News Access Right', 'means the right to a Transmission of non-live footage of the Program in a length specified in the Rights Specification'),
            array('6', true, 'Edited Program Rights', 'means the right to a Transmission of the Edited Program'),
            array('7', true, 'Edited Program', 'means a Program that is edited and delivered to the Licensee ready for Transmission and that may not be edited by the Licensee'),
            //array('1', true, 'Live', 'live'),
            array('8', true, 'Transmission Means', 'means the technical means on which the Licensee may Transmit Program as per Rights Specification'),
            array('*', true, 'Cable & IPTV Transmission', 'means the analogue or digital Transmission by way of coaxial, fibre-optic or any other form of cable, or by means of microwave dish systems (commonly known as MMDS or wireless cable), master antenna television systems (MATV) and satellite master antenna systems (SMATV) or the process of transmitting and broadcasting the Content within television programs solely available to a closed circuit of potential users/subscribers using Internet Protocol (IP)'),
            array('10', true, 'Satellite Transmission', 'means analogue or digital Transmission by way of a satellite system whereby such signal is initially Transmitted to a satellite situated beyond the earth’s atmosphere and is subsequently re-transmitted by transponders or similar devices for reception by a satellite dish at the place where the viewer will view such Transmission'),
            array('11', true, 'Terrestrial Transmission', 'means the analogue or digital Transmission by way of wireless telegraphy signals (e.g. DVB T), which are Transmitted by fixed land-based transmission stations'),
            array('12', true, 'OTT', 'means a service that provides the Program via internet delivery and on internet enabled platforms with or without a multiple system operator being involved in the distribution of the service'),
            array('13', true, 'Internet Transmission', 'means the digital Transmission of the Program by way of any telecommunication system utilizing TCP/IP protocols and/or related protocols including (i) OTT (ii) Transmission on a website or (iii) Transmission on Social Media Platforms, but excluding the IPTV transmission available to the public subject to territorial restrictions and other restrictions agreed between the Parties or applied by the Licensee when exploiting the rights'),
            array('14', true, 'Mobile Transmission', 'means the digital Transmission through a wireless standard or technology including by way of: (i) General Packet Radio Services (GPRS), Global System for Mobile Communications (GSM), Enhanced Data GSM Environment (EDGE), Code Division Multiple Access (CDMA), High Speed Circuit Switched Data (HSCSD), Personal Communications Networks (PCN), Wireless Application Protocol (WAP), Universal Mobile Telecommunications System (UMTS), Bluetooth, Wi-Fi, Digital Video Broadcasting – Handheld (DVB-H), Integrated Services Digital Broadcasting (ISDB) and Digital Mobile Broadcasting (DMB); and (ii) any other wireless telecommunications technology'),
            array('15', true, 'Exploitation Form', 'means the form of exploitation for which the Audio-visual Rights to the Program is granted'),
            array('16', true, 'Free Transmission', 'means, in relation to the Transmission Means to which it is applied, that the Program may be intelligibly received by recipients without any payment other than fees or taxes imposed by any state or local government (or agency thereof) for ownership of, or for general reception of, or access to, such service or channel (or package of services or channels)'),
            array('17', true, 'Pay only', 'means, in relation to the Transmission Means to which it is applied, that the Program may be intelligibly received by recipients on payment of a fee, subscription or other charge (other than fees or taxes imposed by any state or local government (or agency thereof)) for ownership of, or for general reception of or access to, such service or channel (or package of services or channels). This also comprises PPV (Pay-Per-View) Transmission which means that the Program may be intelligibly received by recipients in such a way that a charge or charges are levied on a per program, per occasion, per day (or other period) or per package basis above a standard subscription or channel payment'),
            array('18', true, 'Inship/Inflight Right', 'means the right to Transmit the Program in planes and ships'),
            array('19', true, 'Closed Circuit', 'means the right to Transmit the Program by means of any closed-circuit delivery system to closed user groups such as hotels, restaurants, bars, educational institutions, hospitals, oil rigs, airplanes, cruise ships and other transportation services, and within private intranet groups and virtual private networks other than in betting shops, planes and ships'),
            array('20', true, 'Reserved Rights', 'means the Audio-visual Rights to the Program that may be exploited by the Licensor and its sublicensee irrespective of any exclusivity granted'),
            array('21', true, 'Time Embargo', 'means a specific time after the Event or Single Event until the Licensee is not entitled to Transmit the Program'),
            array('22', true, 'License Period', 'means the time period in which the specific Program may be exploited'),
            array('23', true, 'Number of Runs', 'means the number of Transmission of the Program'),
            array('24', true, 'Transmission Obligation', 'means the obligation to a specific Transmission of the Program'),
            array('25', true, 'Term', 'means term of the License Agreement as defined in clause 2.1 of the General Terms and Conditions'),
            array('26', true, 'License Period', 'means the period in which the Granted Rights may be exploited as per clause 7. of the Schedule subject to Exploitation Window'),
            array('27', true, 'Exploitation Window', 'means the specific time frame within the License Period in which the specific right may be exploited'),
            array('28', true, 'Right to Sublicense', 'means the right to sublicense the granted Audio-visual Rights to a third-party subject to (i) the Licensee being liable for the acts or omissions of each sub-licensee regarding the exploitation of Audio-visual Rights as if such acts or omissions were the acts or omissions of the Licensee and (ii) the Licensee remaining fully liable for all their obligations set out in this Agreement towards the Licensor'),
            array('29', true, 'Video Standard', 'means the format of the Delivered Content'),
            array('30', true, 'SD', '576i / 480i'),
            array('31', true, 'HD', '720i/1080i/1080p'),
            array('32', true, 'UHD', '3840x2160/7680x4320, 4K,8K'),
            array('33', true, 'Effective Date', 'means the date both Parties have signed the License Agreement'),
            array('34', true, 'Licensor', 'means the Party which licenses Audio-visual Rights to the Licensee'),
            array('35', true, 'Licensee', 'means the Party which acquires Audiovisual Rights from the Licensor'),
            array('36', true, 'Parties', 'means the parties to the License Agreement'),
            array('37', true, 'Party', 'means a party to the License Agreement'),
            array('38', true, 'Event', 'means a (sport) event and/or competition to which the Program refers'),
            array('39', true, 'Audio-visual Rights', 'means the right to Transmit audio-visual content'),
            array('40', true, 'Program', 'means the Event or audio-visual content / program to which the Licensor grants rights'),
            array('41', true, 'Territory', 'means the territory or territories for which Audio-visual Rights to the Program is/are granted as per the License Agreement'),
            array('42', true, 'License Agreement', 'means this agreement between the Parties'),
            array('43', true, 'Rights Specifications', 'means specification of the Audio-visual Rights to the Program'),
            array('44', true, 'Licensed Languages', 'means the language in which the Licensee may exploit the Granted Rights'),
            array('45', true, 'General Terms and Conditions', 'means these General Terms and Conditions that together with the Schedule form the License Agreement'),
            array('46', true, 'Schedule', 'means the key terms that together with the General Terms and Conditions form the License Agreement'),
            array('47', true, 'Single Event', 'means a single part of an Event such as a match, game or fight'),
            array('48', true, 'Competition Brand', 'means the official logo and name of the Licensor and the Event (including the composite logos with sponsors (if any))'),
            array('49', true, 'Applicable Law', 'means all applicable laws, regulations, regulatory license conditions, and the relevant regulatory authorities’ directions, rules, standards, guidance and codes of practice in all relevant jurisdictions in the applicable country of the Territory'),
            array('50', true, 'Portable Services', 'have the meaning as stipulated in clause 6.2 of the General Terms and Conditions'),
            array('51', true, 'Delivered Content', 'means the audio-visual content that shall be delivered to the Licensee by the Licensor in order to exploit the Granted Rights. For the avoidance of doubt, the Delivered Content may also comprise of the Program'),
            array('52', true, 'Force Majeure Event', 'means acts, events, omissions or accidents beyond the reasonable control of a Party (including, without limitation, a labour dispute, accident, fire, flood, riot or civil commotion, act of public enemy, legal enactment, government act, rule or regulations or act of God)'),
            array('53', true, 'Prohibited Material', 'means any material that (i) does not comply with Applicable Laws (ii) promotes or disparages any political views, ideologies or parties (iii) depicts violence or is otherwise threatening or abusive (iv) promotes the sale of tobacco, tobacco-related products, drugs or pornography (v) is, in the Licensor’s reasonable opinion, offensive, indecent or encourages, in any manner whatsoever, behaviour which promotes disparaging views or behaviour relating to an individual or groups, race, nationality, ethnicity, sex, sexual orientation, religion, marital status, age or disability (vi) in the Licensor’s reasonable opinion may damage the image and/or reputation of the Licensor the Event or any of its representatives or (vii) includes any gambling or betting element other than the mere advertising of a betting company (or any such gambling or betting elements which are approved by the Licensor). For the avoidance of doubt, any such gambling or betting element shall not however constitute ‘Prohibited Material’ hereunder in the context of the exploitation of the Live Betting Rights'),
            array('54', true, 'Technical Fee', 'means the consideration to be paid by the Licensee for Delivered Content'),
            array('55', true, 'License Fee', 'means the consideration to be paid by the Licensee for the Granted Rights'),
            array('56', true, 'Granted Rights', 'have the meaning as stipulated in clause 3. of the Schedule'),
            array('57', true, 'EAA', 'means the countries within the European Economic Area and any other country which is bound by the Applicable Law of the European Union and the European Economic Area'),
            array('58', true, 'Transmission Obligation', 'means the obligation of the Licensee to a specific Transmission'),
            array('59', true, 'Remuneration', 'means the License Fee and the Technical Fee'),
            array('60', true, 'Live Feed', 'means an audiovisual real-time (subject to latency) feed of the whole Event or of the whole Single Event'),
            array('61', true, 'Delayed & Archive Feed', 'means an audiovisual delayed feed of the whole Event or of the whole Single Event'),
            array('62', true, 'Live Betting Feed', 'means an audiovisual real-time (subject to latency) feed of the Event or of the whole Single Event, the standard of which meets the requirements for betting purposes'),
            array('63', true, 'News Footage', 'means short audiovisual footage of an Event or Single Event, which is used for the purpose of exploiting News Access Rights'),
            array('64', true, 'Highlight & Clip Footage', 'means audiovisual highlight footage of the Event or Single Event'),
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:SourceDefinitions")->findOneBy( array('name' => $content[$i][2] ));

            if ( $en == null ){
                $emailContent = new SourceDefinitions();
                $emailContent->setPosition($content[$i][0]);
                $emailContent->setEditable($content[$i][1]);
                $emailContent->setName($content[$i][2]);
                $emailContent->setContent($content[$i][3]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}