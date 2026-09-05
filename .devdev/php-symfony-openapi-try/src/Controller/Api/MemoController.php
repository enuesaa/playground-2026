<?php

namespace App\Controller\Api;

use App\Dto\MemoInput;
use App\Entity\Memo;
use App\Repository\MemoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Attribute\Model;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/memos')]
#[OA\Tag(name: 'Memo')]
final class MemoController extends AbstractController
{
    #[Route('', name: 'api_memo_index', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'メモの一覧を返す',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Memo::class, groups: ['memo:read'])),
        ),
    )]
    public function index(MemoRepository $memoRepository): JsonResponse
    {
        return $this->json($memoRepository->findAll(), context: ['groups' => ['memo:read']]);
    }

    #[Route('/{id}', name: 'api_memo_show', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: '指定したメモを返す',
        content: new Model(type: Memo::class, groups: ['memo:read']),
    )]
    #[OA\Response(response: 404, description: 'メモが見つからない')]
    public function show(Memo $memo): JsonResponse
    {
        return $this->json($memo, context: ['groups' => ['memo:read']]);
    }

    #[Route('', name: 'api_memo_create', methods: ['POST'])]
    #[OA\RequestBody(content: new Model(type: MemoInput::class))]
    #[OA\Response(
        response: 201,
        description: 'メモを作成する',
        content: new Model(type: Memo::class, groups: ['memo:read']),
    )]
    #[OA\Response(response: 422, description: 'バリデーションエラー')]
    public function create(#[MapRequestPayload] MemoInput $input, EntityManagerInterface $entityManager): JsonResponse
    {
        $memo = new Memo();
        $memo->setTitle($input->title);
        $memo->setDescription($input->description);

        $entityManager->persist($memo);
        $entityManager->flush();

        return $this->json($memo, Response::HTTP_CREATED, context: ['groups' => ['memo:read']]);
    }

    #[Route('/{id}', name: 'api_memo_update', methods: ['PUT'])]
    #[OA\RequestBody(content: new Model(type: MemoInput::class))]
    #[OA\Response(
        response: 200,
        description: 'メモを更新する',
        content: new Model(type: Memo::class, groups: ['memo:read']),
    )]
    #[OA\Response(response: 404, description: 'メモが見つからない')]
    #[OA\Response(response: 422, description: 'バリデーションエラー')]
    public function update(Memo $memo, #[MapRequestPayload] MemoInput $input, EntityManagerInterface $entityManager): JsonResponse
    {
        $memo->setTitle($input->title);
        $memo->setDescription($input->description);

        $entityManager->flush();

        return $this->json($memo, context: ['groups' => ['memo:read']]);
    }

    #[Route('/{id}', name: 'api_memo_delete', methods: ['DELETE'])]
    #[OA\Response(response: 204, description: 'メモを削除する')]
    #[OA\Response(response: 404, description: 'メモが見つからない')]
    public function delete(Memo $memo, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($memo);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
