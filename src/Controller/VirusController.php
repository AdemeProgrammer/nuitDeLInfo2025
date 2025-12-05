<?php
/*
    * Projet Nuit de l'Info — 2025
* Ce programme est publié sous licence GNU AGPLv3.
* Vous pouvez obtenir une copie de la licence à :
* https://www.gnu.org/licenses/agpl-3.0.html
*/
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class VirusController extends AbstractController
{
    #[Route('/virus', name: 'app_virus')]
    public function index(): Response
    {
        return $this->render('virus/virus.html.twig', [
            'controller_name' => 'VirusController',
        ]);
    }
}
