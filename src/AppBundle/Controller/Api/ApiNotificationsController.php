<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\NotificationService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiNotificationsController extends Controller
{

    use ControllerHelper;

    public function __construct()
    {

    }

    /**
     * @Route("/api/notifications/", name="getNotifications")
     * @param Request $request
     * @param NotificationService $notificationService
     * @return JsonResponse
     */
    public function getNotifications(Request $request, NotificationService $notificationService){

        $user = $this->getUser();
        $notifications = $notificationService->getNotifications($user);
        return $this->getSerializedResponse($notifications, array('notification'));
    }

    /**
     * @Route("/api/notifications/all/visited", name="setAllNotificationVisited")
     * @param NotificationService $notificationService
     * @return JsonResponse
     */
    public function setAllNotificationVisited(NotificationService $notificationService){

        $user = $this->getUser();
        $notificationService->setAllNotificationsVisited($user);
        return new JsonResponse(array("success"=>true));
    }

    /**
     * @Route("/api/notifications/remove", name="removeNotifications")
     * @param NotificationService $notificationService
     * @return JsonResponse
     */
    public function removeNotifications(NotificationService $notificationService){

        $user = $this->getUser();
        $notificationService->removeNotifications($user);
        return new JsonResponse(array("success"=>true));
    }

    /**
     * @Route("/api/notifications/visited", name="markNotificationAsVisited")
     * @param Request $request
     * @param NotificationService $notificationService
     * @return JsonResponse
     */
    public function markNotificationAsVisited(Request $request, NotificationService $notificationService){
        $id = $request->request->get('id');
        $notificationService->markNotificationAsVisited($id);

        return new JsonResponse(array("success"=>true));
    }

    /**
     * @Route("/api/notifications/seen", name="markNotificationAsSeen")
     * @param Request $request
     * @param NotificationService $notificationService
     * @return JsonResponse
     */
    public function markNotificationAsSeen(Request $request, NotificationService $notificationService){
        $type = $request->get("type");
        $user = $this->getUser();
        $notificationService->markNotificationAsSeen($user, $type);

        return new JsonResponse(array("success"=>true));
    }

}
