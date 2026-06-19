from sentence_transformers import CrossEncoder

reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

def rerank(
    query,
    docs,
    top_k=5
):

    pairs = []

    for doc in docs:

        pairs.append(
            (
                query,
                doc.page_content
            )
        )

    scores = reranker.predict(
        pairs
    )

    scored = list(
        zip(scores, docs)
    )

    scored.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    return [

        doc

        for score, doc

        in scored[:top_k]
    ]