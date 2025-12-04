<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RetroController extends AbstractController
{
    /**
     * Page de démonstration du mode rétro gaming
     * Nuit de l'Info 2025 - Défi IUTLCO
     */
    #[Route('/demo-retro', name: 'app_demo_retro')]
    public function demo(): Response
    {
        return $this->render('demo_retro.html.twig', [
            'controller_name' => 'RetroController',

        ]);
    }

    /**
     * Exemple de page avec toggle mode rétro
     */
    #[Route('/exemple-toggle', name: 'app_exemple_toggle')]
    public function exempleToggle(): Response
    {
        return $this->render('demo_retro.html.twig', [
            'retro_mode' => false, // Mode rétro désactivé par défaut
            'enable_typewriter' => false,
        ]);
    }

    /**
     * Exemple thématique océans
     * Démontre l'adaptation du template au thème de la Nuit de l'Info
     */
    #[Route('/ocean-retro', name: 'app_ocean_retro')]
    public function oceanRetro(): Response
    {
        return $this->render('exemple_ocean_retro.html.twig', [
            'score' => 0,
        ]);
    }

    /**
     * Exemple de composants
     * Bibliothèque de composants réutilisables
     */
    #[Route('/composants-retro', name: 'app_composants_retro')]
    public function composantsRetro(): Response
    {
        return $this->render('retro_components.html.twig', [
            'example' => true, // Active l'affichage des exemples
        ]);
    }
}
