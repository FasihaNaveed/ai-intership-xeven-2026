class ConversationMemory:

    def __init__(self, limit=10):

        self.limit = limit
        self.history = []

    def add(
        self,
        question,
        answer
    ):

        self.history.append({
            "question": question,
            "answer": answer
        })

        if len(self.history) > self.limit:

            self.history.pop(0)

    def get_context(self):

        context = ""

        for item in self.history:

            context += (
                f"Q: {item['question']}\n"
                f"A: {item['answer']}\n\n"
            )

        return context