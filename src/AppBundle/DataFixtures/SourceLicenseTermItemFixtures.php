<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\SourceLicenseTerm;
use AppBundle\Entity\SourceLicenseTermItem;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class SourceLicenseTermItemFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            //array(TERM_POSITION, POSITION, EDITABLE, CONTENT )
            //array('8', '1', true, ''),
            array('2', '1', true, 'The term of the License Agreement shall start with the Effective Date and end fourteen (14) days after the end of the License Period.'),
            array('2', '2', true, 'All rights granted to the Licensee shall end after the License Period or the relevant Exploitation Window and the Licensee shall not make use or exploit any granted rights beyond the License Period or the relevant Exploitation Window. At the request of the Licensor, the Licensee shall, after the Term, deliver to the Licensor free of charge all Content and other material (such as copies of sales brochures and contracts etc.) that the Licensee used or produced in connection with the exploitation of the Granted Rights.'),
            array('3', '1', true, 'In consideration of payment of the Remunerations, the Licensor grants to Licensees for the Term, the Audio-visual Rights to the Program strictly in accordance with and subject to the terms set out in this License Agreement.'),
            array('3', '2', true, 'Irrespective of the exclusivity of the Granted Rights (if any), the Reserved Rights shall always be available for the Licensor and third-party exploitation.'),
            array('4', '1', false, 'The Licence Fee and Technical Fee shall be paid by Licensees to the Licensor in accordance with Clause 10 of the Schedule.'),
            array('4', '2', true, 'Any payment made by the Licensee pursuant to the License Agreement shall be made by bank transfer, in full, without any deduction, set off or withholding other than stipulated below (whether in respect of duties, taxes, charges, or otherwise) and after receipt of a proper invoice.'),
            array('4', '3', true, 'The Licensor’s acceptance of any payment after this due date shall not constitute a waiver by the Licensor of any of its rights hereunder.'),
            array('4', '4', true, 'If any scheduled payment of a Licensee owing pursuant to the License Agreement is not paid when due, the Licensee shall pay to the Licensor, in addition to all sums otherwise due and payable, a late charge in an amount equal to 4% percent per annum of the unpaid amount (calculated in respect of the period during which the relevant payment was overdue), subject to the receipt of a payment reminder in which a payment deadline of 20 days is notified. The Licensor’s acceptance of any payment after this due date shall not constitute a waiver by the Licensor of any of its rights hereunder.'),
            array('4', '5', true, 'If the Licensee is required by any Applicable Law to make any withholding in respect of any amount payable to the Licensor under the License Agreement, an additional amount shall be payable to the Licensor at the same time so that the Licensor receives the full amount of each such payment which it would have received if no withholding had been so required. The Licensor shall then provide on a timely basis all reasonable assistance and other documentary evidence so as to enable Licensees (where relevant) to be able to make any payment without withholding or at a lower rate of withholding or to procure a tax credit from the relevant tax authority equal to the amount withheld.'),
            array('4', '6', true, 'If exchange control or other restrictions prevent or threaten to prevent the remittance to the Licensor of any payments due to the Licensor under the License Agreement, the Licensee shall immediately advise the Licensor in writing and follow the Licensor’s instructions in respect of the payment to be so remitted including if required depositing the same with any bank or other person designated by the Licensor at such location as may be designated by the Licensor.'),
            array('5', '1', true, 'The Licensee ensures that it and any of its sub-licensees hold all necessary licenses, permissions or authorizations to operate the platforms/channels on which the Program is Transmitted. In addition, the Licensee shall at all times adhere to Applicable Laws when exploiting and/or marketing the Granted Rights.'),
            array('5', '2', true, 'The Licensee procures that its employees, representatives and agents shall at all times during the Term not engage in any activity that could damage the image or damage the reputation of the Event / Program, the Licensor and their representatives.'),
            array('5', '3', true, 'The rights granted are subject to continuous compliance with all terms and conditions of the License Agreement. If a Licensee fails to comply with its obligations, the Licensor may (i) suspend any rights granted and/or (ii) withdraw access to the Delivered Content or material provided by the Licensor, in each case without any right for the Licensee to any compensation or reduction in the Remuneration.'),
            array('5', '4', true, 'Licensees warrant (i) not to Transmit the Program on platform(s)/channels which are not, in the reasonable opinion of the Licensor, appropriate for the Transmission of premium (sports) content or (ii) which may harm the reputation of the Licensor, the Event / Program or that feature Prohibited Material.'),
            array('5', '5', true, 'The Licensee shall not be permitted to (i) insert advertising in the Programs in a manner which would unreasonably cover any event-action with advertising unless otherwise agreed upon in writing and (ii) partially or totally, cover or alter or weaken the appearance of the Competition Brands or (iii) use graphics other than the Competition Brands provided by the Licensor during the Transmission of the Program, if not expressly agreed otherwise. The Licensor always reserves the right to include Competition Brands or graphic elements of sponsors in the Programs (e.g. timing sponsor) and the Licensees are obliged to ensure that these marks will be displayed as determined in the specifications and guidelines provided by the Licensor from time to time.'),
            array('6', '1', true, 'To the maximum extent permitted by Applicable Law, each Licensee will be contractually required to ensure the territorial integrity of its Transmissions of the Program made pursuant to the Audio-visual Rights granted, for example, by the use of secure and effective encryption, geo-blocking or similar technology and appropriate scrutiny and verification of the residences and/or locations of subscribers and users, so as to ensure that no person outside the Territory awarded by the Licensor to a specific Licensee can access or view such content in an intelligible form.'),
            array('6', '2', true, 'Customary exceptions will be allowed by the Licensor for: (i) unavoidable overspill of unencrypted free over the air analogue and digital terrestrial transmissions; (ii) non-material overspill of unencrypted Satellite Transmissions where expressly approved by the Licensor (iii) the absolute effectiveness of geo blocking and DRM technology; (iv) cross-border \'portability\' of online audio-visual services within the EEA as per EU Directive 2015/0284(COD) (hereinafter “Portable Services”); and (v) requirements imposed by Applicable Law and any further overspill that cannot be prevented or restricted as a result of a change in Applicable Laws.'),
            array('6', '3', true, 'In addition, Licensees within the EEA shall be permitted to make Transmissions of the Program by means of satellite television via a designated satellite capable of reception outside the Territory awarded by the Licensor, provided that all such Transmissions are securely encrypted (or similar conditional access technology is deployed) so that no person outside the EEA can access or view such content in an intelligible form. Such Licensee shall be entitled to sell or otherwise supply equipment or devices (including, but not limited to any so-called "smart cards" and/or any decoding equipment) which are necessary to decode such Transmissions or to receive such Transmissions in an intelligible form to residents of the EEA outside the applicable Territory who have actively requested or ordered the same. Licensees shall otherwise be prohibited from actively marketing or soliciting orders for any decoding or similar equipment which is necessary to decode such Transmissions to or from any person outside the Territory awarded by the Licensor.'),
            array('6', '4', true, 'For portable services that are subject to EU Directive 2015/0284(COD), the Licensee shall (i) provide with efficient verification the means deployed by the Licensee for a portable service to ensure on an ongoing basis that such service is being accessed and viewed only by customers who are, at that time, habitually resident in the Territory in accordance with EU Directive 2015/0284(COD) (ii) ensure that only subscribers of the portable service who have been verified by efficient verification means shall be entitled to access the portable service from any Territory other than the granted Territory. Licensees shall otherwise be prohibited from actively marketing or soliciting orders for any portable service outside the Territory awarded by the Licensor.'),
            array('7', '1', false, 'Licensees shall provide the Delivered Content as defined in Clause 8 of the Schedule.'),
            array('8', '1', true, 'Neither Party may assign, transfer or otherwise dispose of this License Agreement or any obligation with respect thereto to any third party without the prior written consent of the other Party unless explicitly otherwise stipulated in the Schedule'),
            array('8', '2', true, 'In case the Licensor permits the Licensee to sub-license the Audio-visual Rights awarded, then (i) the Licensee shall be liable for the acts or omissions of each sub-licensee regarding the exploitation of the Granted Rights as if such acts or omissions were the acts or omissions of the Licensee and (ii) the Licensee remaining fully liable for all its obligations set out in this License Agreement (iii) the Licensees shall award/sublicense Granted Rights always and at any time in accordance with the relevant competition laws'),
            array('9', '1', true, 'During the entire Term, the Licensor shall be exclusively and at its sole discretion entitled to change formats, rules, determined start times including the number of Single Events of any of the Events.'),
            array('9', '2', true, 'In the event that format or scope of the Event including the scope of Single Events is amended during the Term, and such amendments, issuances and/or decisions by the Licensor entail a material and materially adverse effect on the Granted Rights, then the Parties shall amicably discuss adjustments of the Remunerations, unless the amendment or decision has been previously approved by the Licensee.'),
            array('10', '1', true, 'The Licensor may terminate the License Agreement with immediate effect by written notice to the Licensee if:
⦁	the Licensee fails to pay any sums due to the Licensor on the due date and any such default continues for a further period of twenty (20) working days;
⦁	the Licensee breaches any other material term of the License Agreement, which is not capable of remedy or if capable of remedy has not been remedied within twenty (20) days after a notice in writing from the Party not in breach requiring such remedy; 
⦁	the Licensee applies for a moratorium on debts, or becomes insolvent or enters into any composition or arrangement with its creditors, or does anything which would make it liable to be put into liquidation, or if a resolution is passed or an application is made for the liquidation of any Party, or a receiver or statutory or official manager is appointed over all or any of the assets of any Party.'),
            array('10', '2', true, 'The Licensee may terminate the License Agreement with immediate effect by written notice to the Licensor if the Licensor commits a breach of a material term of the License Agreement which is not capable of remedy or if capable of remedy has not been remedied within twenty (20) days after a notice in writing from the Party not in breach requiring such remedy.'),
            array('10', '3', true, 'The Licensee agrees that in the event of early termination of the License Agreement pursuant to clauses 10.1 and 10.2. for any reason whatsoever, the Licensee shall:
⦁	immediately cease to exercise the Granted Rights;
⦁	shall deliver free of charge all copies and originals of all Programs and Delivered Content produced by the Licensee and/or its sub-licensees;
In the event of early termination of the License Agreement pursuant to a reason described in clause 10.1 first and second bullet point, then the Licensee furthermore shall immediately pay to the Licensor all the agreed Remunerations arising from the License Agreement'),
            array('10', '4', true, 'Termination of this License Agreement for whatever reason shall be without prejudice to any accrued rights and remedies to which either Party may be entitled hereunder, in particular but without limitation, the right to recover damages against the other Party and all provisions which are expressed to survive the License Agreement shall remain in full force and effect.'),
            array('11', '1', true, 'Save as explicitly provided herein, nothing in this License Agreement or in the business relationship between the Parties shall constitute or be construed as the transfer or grant to the Licensee for any property right, software, license, or any other right or interest in any information, data or work product made available by the Licensor in the course of the business relationship or in any trademarks or other intellectual property rights owned by the Licensor or any of their subsidiaries. Copyright to all Program and Delivered Content produced by the Licensor including any modification or editing of the Program and Delivered Content by way of adding voice and commentaries from sports commentators is vested in the Licensor.'),
            array('11', '2', true, 'Copyright to all Program produced by the Licensee, including any modification or editing of the Programs and Delivered Content by way of adding voice and commentaries from sports commentators is vested in the Licensee.'),
            array('12', '1', true, 'The Licensor and Licensees hereby warrant that (i) they are fully entitled to enter into this License Agreement and to perform all its obligations, and that they have not and will not enter into any agreements inconsistent with the provisions hereof; and (ii) they shall defend, indemnify and hold the other Party harmless from and against any claims, costs, demands, proceedings or damages (including lawyer\'s fees) arising out of any failure to comply with their obligations hereunder.'),
            array('12', '2', true, 'Notwithstanding the above, the Licensor shall not be liable to others for any indirect or consequential loss or damage, and the maximum aggregate liability of the Licensor for any indemnity, loss or damage from all incidents during the Term shall be limited to a sum equivalent to the Remuneration. The foregoing exclusions and limitations of liability shall apply to the extent permitted by any mandatory Applicable Law.'),
            array('13', '1', true, 'Neither Party shall be liable to the other Party for any expenses or damages if performance of any of its obligations under the License Agreement is prevented (in full or in part) or delayed due to Force Majeure provided that the relevant affected Party shall: (i) promptly upon the occurrence of any such cause or event inform the other Party in writing, stating that such cause has delayed or prevented its performance; and (ii) take all reasonable steps to comply with the terms of the License Agreement as fully and promptly as possible.'),
            array('13', '2', true, 'Should any Force Majeure Event prevent a Party performing any of its obligations under the License Agreement, for more than ninety (90) days, then the other Party may terminate the License Agreement with immediate effect on written notice to the other Party.'),
        );

        for ($i = 0; $i < count($content); $i++) {

            $term =  $manager->getRepository("AppBundle:SourceLicenseTerm")->findOneBy( array("position" => $content[$i][0]) );
            $criteria = array('position' => $content[$i][1], 'term' => $term  );
            $en = $manager->getRepository("AppBundle:SourceLicenseTermItem")->findOneBy( $criteria );

            if ( $en == null ){
                $item = new SourceLicenseTermItem();
                $item->setTerm($term);
                $item->setPosition($content[$i][1]);
                $item->setEditable($content[$i][2]);
                $item->setContent($content[$i][3]);
                $manager->persist($item);
            }
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            SourceLicenseTermFixtures::class,
        );
    }
}