import QuizCard from "../../components/QuizCard"; // 👈 import



{/* List */ }
{ loading && <p>Đang tải danh sách đề thi...</p> }
{ error && <p className="text-red-500">{error}</p> }
{
    !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}
