<?php

namespace App\DataFixtures;

use App\Entity\Memo;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $samples = [
            ['title' => '買い物リスト', 'description' => '牛乳・卵・パンを買う'],
            ['title' => 'ミーティングメモ', 'description' => '次回リリースのスコープを確認する'],
            ['title' => '読書メモ', 'description' => 'Symfonyのドキュメントを読み進める'],
        ];

        foreach ($samples as $sample) {
            $memo = new Memo();
            $memo->setTitle($sample['title']);
            $memo->setDescription($sample['description']);
            $manager->persist($memo);
        }

        $manager->flush();
    }
}
