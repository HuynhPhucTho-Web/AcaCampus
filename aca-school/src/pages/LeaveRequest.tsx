import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { FileText, Calendar, Send, Check, User } from 'lucide-react';

const LABELS = {
  vi: {
    title: 'Đơn xin nghỉ',
    subtitle: 'Gửi đơn xin nghỉ học',
    studentName: 'Tên học sinh',
    className: 'Lớp',
    reason: 'Lý do nghỉ',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    submit: 'Gửi đơn',
    cancel: 'Hủy',
    status: 'Trạng thái',
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    myRequests: 'Đơn của tôi',
    newRequest: 'Đơn mới',
    reasonPlaceholder: 'Nhập lý do xin nghỉ...',
    reasonOptions: {
      sick: 'Ốm đau',
      family: 'Việc gia đình',
      personal: 'Việc cá nhân',
      other: 'Lý do khác',
    },
    success: 'Gửi đơn thành công!',
    history: 'Lịch sử đơn',
  },
  en: {
    title: 'Leave Request',
    subtitle: 'Submit a leave request',
    studentName: 'Student Name',
    className: 'Class',
    reason: 'Reason for leave',
    startDate: 'Start Date',
    endDate: 'End Date',
    submit: 'Submit',
    cancel: 'Cancel',
    status: 'Status',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    myRequests: 'My Requests',
    newRequest: 'New Request',
    reasonPlaceholder: 'Enter reason for leave...',
    reasonOptions: {
      sick: 'Sick',
      family: 'Family matters',
      personal: 'Personal',
      other: 'Other',
    },
    success: 'Request submitted successfully!',
    history: 'Request History',
  },
  ja: {
    title: '休暇届',
    subtitle: '休暇届を提出',
    studentName: '生徒名',
    className: 'クラス',
    reason: '休暇の理由',
    startDate: '開始日',
    endDate: '終了日',
    submit: '提出',
    cancel: 'キャンセル',
    status: 'ステータス',
    pending: '承認待ち',
    approved: '承認済み',
    rejected: '却下',
    myRequests: '自分の申請',
    newRequest: '新規申請',
    reasonPlaceholder: '休暇の理由を入力...',
    reasonOptions: {
      sick: '病気',
      family: '家族の用事',
      personal: '個人的な理由',
      other: 'その他',
    },
    success: '申請が正常に送信されました！',
    history: '申請履歴',
  },
  zh: {
    title: '请假申请',
    subtitle: '提交请假申请',
    studentName: '学生姓名',
    className: '班级',
    reason: '请假原因',
    startDate: '开始日期',
    endDate: '结束日期',
    submit: '提交',
    cancel: '取消',
    status: '状态',
    pending: '待审批',
    approved: '已批准',
    rejected: '已拒绝',
    myRequests: '我的申请',
    newRequest: '新申请',
    reasonPlaceholder: '请输入请假原因...',
    reasonOptions: {
      sick: '生病',
      family: '家庭事务',
      personal: '个人原因',
      other: '其他',
    },
    success: '申请提交成功！',
    history: '申请历史',
  },
  ko: {
    title: '휴가 신청',
    subtitle: '휴가 신청서 제출',
    studentName: '학생 이름',
    className: '반',
    reason: '휴가 사유',
    startDate: '시작일',
    endDate: '종료일',
    submit: '제출',
    cancel: '취소',
    status: '상태',
    pending: '대기중',
    approved: '승인됨',
    rejected: '거부됨',
    myRequests: '내 신청',
    newRequest: '새 신청',
    reasonPlaceholder: '휴가 사유 입력...',
    reasonOptions: {
      sick: '병가',
      family: '가족 일',
      personal: '개인 사정',
      other: '기타',
    },
    success: '신청이 성공적으로 제출되었습니다!',
    history: '신청 내역',
  },
  fr: {
    title: 'Demande de congés',
    subtitle: 'Soumettre une demande de congés',
    studentName: 'Nom de l\'élève',
    className: 'Classe',
    reason: 'Motif de l\'absence',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    submit: 'Soumettre',
    cancel: 'Annuler',
    status: 'Statut',
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    myRequests: 'Mes demandes',
    newRequest: 'Nouvelle demande',
    reasonPlaceholder: 'Entrez le motif de l\'absence...',
    reasonOptions: {
      sick: 'Maladie',
      family: 'Affaires familiales',
      personal: 'Personnel',
      other: 'Autre',
    },
    success: 'Demande soumise avec succès!',
    history: 'Historique des demandes',
  },
  es: {
    title: 'Solicitud de permiso',
    subtitle: 'Enviar solicitud de permiso',
    studentName: 'Nombre del estudiante',
    className: 'Clase',
    reason: 'Motivo del permiso',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de fin',
    submit: 'Enviar',
    cancel: 'Cancelar',
    status: 'Estado',
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    myRequests: 'Mis solicitudes',
    newRequest: 'Nueva solicitud',
    reasonPlaceholder: 'Ingrese el motivo del permiso...',
    reasonOptions: {
      sick: 'Enfermedad',
      family: 'Asuntos familiares',
      personal: 'Personal',
      other: 'Otro',
    },
    success: '¡Solicitud enviada con éxito!',
    history: 'Historial de solicitudes',
  },
  de: {
    title: 'Urlaubsantrag',
    subtitle: 'Urlaubsantrag einreichen',
    studentName: 'Schülername',
    className: 'Klasse',
    reason: 'Abwesenheitsgrund',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    submit: 'Einreichen',
    cancel: 'Abbrechen',
    status: 'Status',
    pending: 'Ausstehend',
    approved: 'Genehmigt',
    rejected: 'Abgelehnt',
    myRequests: 'Meine Anträge',
    newRequest: 'Neuer Antrag',
    reasonPlaceholder: 'Geben Sie den Abwesenheitsgrund ein...',
    reasonOptions: {
      sick: 'Krankheit',
      family: 'Familienangelegenheiten',
      personal: 'Persönlich',
      other: 'Sonstiges',
    },
    success: 'Antrag erfolgreich eingereicht!',
    history: 'Antragsverlauf',
  },
};

const ILLUSTRATION_IMAGES = [
  'https://s3.us-west-2.amazonaws.com/yourware-assets/user_assets/20vymiSsy6c0496NYHUdYrhU3Vz1/324c3383-cf59-4de6-8cdb-9b1461035e05/lm5gqq3b5j.png',
  'https://s3.us-west-2.amazonaws.com/yourware-assets/user_assets/20vymiSsy6c0496NYHUdYrhU3Vz1/803467ac-a79e-454c-992a-41dd5436660a/8j8582a69v.png',
  'https://s3.us-west-2.amazonaws.com/yourware-assets/user_assets/20vymiSsy6c0496NYHUdYrhU3Vz1/03a567b7-9d91-4379-8d79-cd3ebb7debac/iqmhsosfwr.png',
  'https://s3.us-west-2.amazonaws.com/yourware-assets/user_assets/20vymiSsy6c0496NYHUdYrhU3Vz1/cd48c09e-d82f-4398-8575-8aed9e87ab13/5f54w0b8n5.png',
];

export default function LeaveRequest() {
  const { theme, language, user, leaveRequests, addLeaveRequest } = useAppStore();
  const illustrationSrc = (() => {
    const seed = `${user?.id ?? 'guest'}:${language}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    const idx = hash % ILLUSTRATION_IMAGES.length;
    return ILLUSTRATION_IMAGES[idx] ?? ILLUSTRATION_IMAGES[0];
  })();
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    className: '10A1',
    reasonType: '',
    reason: '',
    startDate: '',
    endDate: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const t = LABELS[language] || LABELS.vi;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now().toString(),
      studentId: user?.id || 'student1',
      studentName: formData.studentName,
      classId: formData.className,
      reason: formData.reasonType === 'other' ? formData.reason : formData.reasonType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    
    addLeaveRequest(newRequest);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowForm(false);
      setFormData({
        studentName: user?.name || '',
        className: '10A1',
        reasonType: '',
        reason: '',
        startDate: '',
        endDate: '',
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return t.approved;
      case 'rejected':
        return t.rejected;
      default:
        return t.pending;
    }
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} flex items-center gap-3`}>
          <FileText className="w-8 h-8 text-purple-500" />
          {t.title}
        </h1>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowForm(true)}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
            showForm
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : theme === 'dark'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          {t.newRequest}
        </button>
        <button
          onClick={() => setShowForm(false)}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
            !showForm
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : theme === 'dark'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          {t.history}
        </button>
      </div>

      {showForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className={`rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6`}>
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t.success}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.studentName}
                  </label>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <User className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className={`flex-1 bg-transparent outline-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                      required
                    />
                  </div>
                </div>

                {/* Class */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.className}
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} outline-none`}
                    required
                  >
                    <option value="10A1">10A1</option>
                    <option value="10A2">10A2</option>
                    <option value="10A3">10A3</option>
                    <option value="11A1">11A1</option>
                    <option value="11A2">11A2</option>
                    <option value="12A1">12A1</option>
                  </select>
                </div>

                {/* Reason Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.reason}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(t.reasonOptions).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, reasonType: key })}
                        className={`px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                          formData.reasonType === key
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reason Detail */}
                {formData.reasonType === 'other' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.reason}
                    </label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder={t.reasonPlaceholder}
                      className={`w-full px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} outline-none resize-none`}
                      rows={3}
                      required
                    />
                  </div>
                )}

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.startDate}
                    </label>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className={`flex-1 bg-transparent outline-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.endDate}
                    </label>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className={`flex-1 bg-transparent outline-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t.submit}
                </button>
              </form>
            )}
          </div>

          {/* Illustration */}
          <div className={`rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6 flex flex-col items-center justify-center`}>
            <img
              src={illustrationSrc}
              alt="Leave Request Illustration"
              className="w-full max-w-sm rounded-2xl"
            />
            <p className={`mt-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'vi' && 'Hãy điền đầy đủ thông tin để gửi đơn xin nghỉ học'}
              {language === 'en' && 'Please fill in all information to submit a leave request'}
              {language === 'ja' && '休暇届を提出するには、すべての情報にご記入ください'}
              {language === 'zh' && '请填写完整信息以提交请假申请'}
              {language === 'ko' && '휴가 신청을 하려면 모든 정보를 입력해 주세요'}
              {language === 'fr' && 'Veuillez remplir toutes les informations pour soumettre une demande de congés'}
              {language === 'es' && 'Por favor complete toda la información para enviar una solicitud de permiso'}
              {language === 'de' && 'Bitte füllen Sie alle Informationen aus, um einen Urlaubsantrag einzureichen'}
            </p>
          </div>
        </div>
      ) : (
        /* History */
        <div className={`rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl p-6`}>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t.history}
          </h2>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {request.studentName} - {request.classId}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {request.reason}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </div>
                <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {request.startDate} - {request.endDate}
                  </span>
                  {request.approvedBy && (
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      {request.approvedBy}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
