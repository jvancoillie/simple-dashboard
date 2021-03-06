<?php
/**
 * Created by PhpStorm.
 * User: kami
 * Date: 04/02/2019
 * Time: 15:02
 */

namespace App\Controller\Admin;

use App\Form\ChangePasswordType;
use App\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Controller used to manage current user.
 *
 * @Route("/admin/profile")
 * @IsGranted("ROLE_USER")
 * */
class ProfileController extends AbstractController
{

    /**
     * @Route("/", methods={"GET"}, name="admin_profile_index")
     */
    public function index(Request $request): Response
    {
        $user = $this->getUser();
        $formUser = $this->createForm(UserType::class, $user, [
            'action' => $this->generateUrl('admin_profile_edit')
        ]);

        $formPassword = $this->createForm(ChangePasswordType::class, null,  [
            'action' => $this->generateUrl('admin_profile_change_password')
        ]);


        return $this->render('admin/profile/index.html.twig', [
            'user' => $user,
            'form_user' => $formUser->createView(),
            'form_password' => $formPassword->createView()
        ]);
    }

    /**
     * @Route("/edit", methods={"GET", "POST"}, name="admin_profile_edit")
     */
    public function edit(Request $request): Response
    {
        $user = $this->getUser();
        $formUser = $this->createForm(UserType::class, $user, [
            'action' => $this->generateUrl('admin_profile_edit')
        ]);

        $formPassword = $this->createForm(ChangePasswordType::class, null,  [
            'action' => $this->generateUrl('admin_profile_change_password')
        ]);

        $formUser->handleRequest($request);

        if ($formUser->isSubmitted() && $formUser->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', 'user.updated_successfully');
            return $this->redirectToRoute('admin_profile_index');
        }

        return $this->render('admin/profile/index.html.twig', [
            'user' => $user,
            'form_user' => $formUser->createView(),
            'form_password' => $formPassword->createView()
        ]);
    }

    /**
     * @Route("/change-password", methods={"GET", "POST"}, name="admin_profile_change_password")
     */
    public function changePassword(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        $user = $this->getUser();
        $formUser = $this->createForm(UserType::class, $user, [
            'action' => $this->generateUrl('admin_profile_edit')
        ]);

        $formPassword = $this->createForm(ChangePasswordType::class, null,  [
            'action' => $this->generateUrl('admin_profile_change_password')
        ]);

        $formPassword->handleRequest($request);
        if ($formPassword->isSubmitted() && $formPassword->isValid()) {
            $user->setPassword($encoder->encodePassword($user, $formPassword->get('newPassword')->getData()));
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('app_logout');
        }

        return $this->render('admin/profile/index.html.twig', [
            'user' => $user,
            'form_user' => $formUser->createView(),
            'form_password' => $formPassword->createView()
        ]);
    }



}